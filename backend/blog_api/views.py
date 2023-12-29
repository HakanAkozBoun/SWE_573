import json
from .models import blog, category, unittype, unititem, food, recipe, unitconversion, unit, nutrition, comment
from .serializers import blogSerializer, categorySerializer
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.forms.models import model_to_dict
from django.core.files.storage import default_storage

import base64
# Create your views here.

class blogApiView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = blog.objects.all()
    serializer_class = blogSerializer
    lookup_field = 'slug'

class categoryApiView(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = category.objects.all()
    serializer_class = categorySerializer
    lookup_field = 'id'

class CategoryPostApiView(viewsets.ViewSet):
    def retrieve(self, request,pk=None):
        queryset = blog.objects.filter(category=pk)
        serializer = blogSerializer(queryset, many=True)
        return Response(serializer.data)

class PopularPostsApiView(viewsets.ViewSet):
    def list(self, request,pk=None):
        queryset = blog.objects.filter(postlabel__iexact='POPULAR').order_by('-id')[0:4]
        serializer = blogSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def GetUserList(request):
    all_users = User.objects.all().values("id","username", "first_name", "last_name", 'email', 'is_active', 'last_login')
    user_list = list(all_users)
    return JsonResponse(user_list, safe=False)

@api_view(['PUT'])
def UpdateUser(request):
    user = User.objects.get(id=request.data.get('id'))
    user.username = request.data.get('user')
    user.email = request.data.get('mail')
    user.save()
    return JsonResponse(True, safe=False)

@api_view(['GET'])
def GetUser(request):
    return JsonResponse(model_to_dict(User.objects.get(id=request.GET.get('id'))), safe=False)

@api_view(['GET'])
def GetCategoryList(request):
    all_users = category.objects.all().values("id", "name", "image")
    user_list = list(all_users)
    return JsonResponse(user_list, safe=False)

@api_view(['POST'])
def CreateUser(request):
    _id=request.data.get('id')
    if _id is None:
        User.objects.create_user(username=request.data.get('user'),email=request.data.get('mail'),first_name="hakan", last_name="akoz", password=request.data.get('pass'))
    else:
        user = User.objects.get(id=request.data.get('id'))
        if user is None:
            return JsonResponse("id not found", safe=False)
        user.username = request.data.get('user')
        user.email = request.data.get('mail')
        user.save()
    return JsonResponse("OK", safe=False)

@api_view(['POST'])
def CreateCategory(request):
    _id=request.data.get('id')
    if _id is None:
        category.objects.create(name=request.data.get('name'), image=request.data.get('image'))
    else:
        _category = category.objects.filter(id=_id).first()
        if _category is None:
            return JsonResponse("id not found", safe=False)
        _category.name=request.data.get('name')
        _category.image=request.data.get('image')
        _category.save()
    return JsonResponse("OK", safe=False)

@api_view(['POST'])
def File(request):
    file = request.FILES['file']
    file_name = default_storage.save('image\\' + file.name, file)
    return JsonResponse(file_name, safe=False)

@api_view(['POST'])
def CreateBlog(request):
    _id=request.data.get('id')
    if _id is None:
        _blog = blog.objects.create(category_id=request.data.get('category'), title=request.data.get('title'),slug=request.data.get('slug'),excerpt=request.data.get('excerpt'),content=request.data.get('content'),contentTwo=request.data.get('contentTwo'),image=request.data.get('image'),ingredients=request.data.get('ingredients'),postlabel=request.data.get('postlabel'))
    else:
        _blog = blog.objects.filter(id=_id).first()
        if _blog is None:
             return JsonResponse("id not found", safe=False)
        _blog.category_id=request.data.get('category')
        _blog.title=request.data.get('title')
        _blog.slug=request.data.get('slug')
        _blog.excerpt=request.data.get('excerpt')
        _blog.content=request.data.get('content')
        _blog.contentTwo=request.data.get('contentTwo')
        _blog.image=request.data.get('image')
        _blog.ingredients=request.data.get('ingredients')
        _blog.postlabel=request.data.get('postlabel')
        _blog.save()

        list = recipe.objects.filter(blog=_id)
        for item in list:
            item.delete()

    list=request.data.get('list')
    conversion = unitconversion.objects.all()
    for item in list:
        metricamount = item.get('amount')
        metricunit = item.get('unit')
        _conversion = conversion.filter(imperial=item.get('unit'))
        if _conversion:
            metricamount /= _conversion.first().ivalue
            metricunit = _conversion.first().metric
        recipe.objects.create(food=item.get('food'), unit=item.get('unit'), amount=item.get('amount'), blog=_blog.id, metricamount=metricamount, metricunit=metricunit)
    return JsonResponse(_blog.id, safe=False)

@api_view(['GET'])
def GetBlogList(request):
    all_blog = blog.objects.all().values("id", "name", "image")
    blog_list = list(all_blog)
    return JsonResponse(blog_list, safe=False)

@api_view(['GET'])
def GetBlog(request):
    all_blog = blog.objects.filter(blog=2).values("id", "name", "image")
    blog_list = list(all_blog)
    return JsonResponse(blog_list, safe=False)

@api_view(['GET'])
def GetFood(request):
    return JsonResponse(model_to_dict(food.objects.get(id=request.GET.get('id'))), safe=False)

@api_view(['GET'])
def GetFoodList(request):
    list = []
    current = food.objects.all()
    unit = unittype.objects.values_list('name', flat=True).all()
    for item in current:
        list.append({"id":item.id, "unitid": item.unit,"unit":unit.get(id=item.unit), "name":item.name})
    return JsonResponse(list, safe=False)

@api_view(['GET'])
def GetRecipeList(request):
    list = []
    current = recipe.objects.filter(blog=request.GET.get('blog'))
    _food = food.objects.values_list('name', flat=True).all()
    _unit = unit.objects.values_list('name', flat=True).all()
    for item in current:
        list.append({ "food" : _food.get(id=item.food) , "unit" : _unit.get(id=item.unit), "unitid":item.unit, "amount":item.amount, "metricamount":item.metricamount, "metricunit":_unit.get(id=item.metricunit), "metricunitid":item.metricunit})
    return JsonResponse(list, safe=False)

@api_view(['GET'])
def GetUnitList(request):
    return JsonResponse(list(unit.objects.all().values("id", "name","type")), safe=False)

@api_view(['GET'])
def GetUnitType(request):
    return JsonResponse(model_to_dict(unittype.objects.get(id=request.GET.get('id'))), safe=False)

@api_view(['GET'])
def GetUnitTypeList(request):
    return JsonResponse(list(unittype.objects.all().values("id", "name")), safe=False)

@api_view(['GET'])
def GetUnitItem(request):
    return JsonResponse(model_to_dict(unititem.objects.get(id=request.GET.get('id'))), safe=False)

@api_view(['GET'])
def GetUnitItemList(request):
    return JsonResponse(list(unititem.objects.filter(unit=request.GET.get('unit')).values("id", "imperial", "metric", "unit")), safe=False)

@api_view(['GET'])
def GetUnitConversionList(request):
    return JsonResponse(list(unitconversion.objects.filter(unittype=request.GET.get('unit')).values("id", "imperial", "metric", "mvalue", "ivalue", "unittype")), safe=False)

@api_view(['GET'])
def GetNutrition(request):
    _blog = blog.objects.get(id=request.GET.get('blog'))
    _nutrition = nutrition.objects.all()
    _recipe = recipe.objects.filter(blog=_blog.id)
    calorie = 0
    fat = 0
    sodium = 0
    calcium = 0
    protein = 0
    iron = 0
    carbonhydrates = 0
    for i in _recipe:
        __nutrition = _nutrition.filter(food=i.food).first()
        if __nutrition:
            calorie += __nutrition.calorie * i.metricamount
            fat += __nutrition.fat * i.metricamount
            sodium += __nutrition.sodium * i.metricamount
            calcium+= __nutrition.calcium * i.metricamount
            protein += __nutrition.protein * i.metricamount
            iron += __nutrition.iron * i.metricamount
            carbonhydrates += __nutrition.carbonhydrates * i.metricamount
    return JsonResponse(json.loads('{"blog":"' + str(_blog.title) + '","blogid":' + str(_blog.id) + ',"calorie":' + str(calorie) + ',"fat":' + str(fat) + ',"sodium":' + str(sodium) + ',"calcium":' + str(calcium) + ',"protein":' + str(protein) + ',"iron":' + str(iron) + ',"carbonhydrates":' + str(carbonhydrates) + '}'), safe=False)

@api_view(['GET'])
def GetCommentList(request):
    list = []
    _user = User.objects.all()
    _list = comment.objects.filter(blog=request.GET.get('blog'))
    for i in _list:
        __user = _user.filter(id=i.user).first()
        list.append({ "id":i.id, "name" : __user.first_name , "lastname" : __user.last_name, "userid":__user.id, "blogid":i.blog, "text": i.text})
    return JsonResponse(list, safe=False)

@api_view(['POST'])
def CreateComment(request):
    _id=request.data.get('id')
    if _id is None:
        _comment = comment.objects.create(user=request.data.get('user'),blog=request.data.get('blog'),text=request.data.get('text'))
    else:
        _comment = comment.objects.filter(id=_id).first()
        if _comment is None:
            return JsonResponse("id not found", safe=False)
        _comment.user=request.data.get('user')
        _comment.blog=request.data.get('blog')
        _comment.text=request.data.get('text')
        _comment.save()
        return JsonResponse(_comment.id, safe=False)
    
    return JsonResponse(_comment.id, safe=False)

@api_view(['POST'])
# @authentication_classes([])
# @permission_classes([])
def Login(request):
    username=request.data.get('user')
    password=request.data.get('pass')
    user = authenticate(username=username, password=password)
    if user is not None:
        return JsonResponse(json.loads('{"token":"' + base64.b64encode(bytes(username + ":" + password, 'utf-8')).decode('utf-8') + '", "id":' + str(user.id) + ',"name":"' + user.username + '"}'), safe=False)
    return JsonResponse("Wrong User or Password", safe=False)


