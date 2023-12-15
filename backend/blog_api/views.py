import json
from .models import blog, category, unittype, unititem, food, recipe, recipeitem, unitconversion, unit, nutrition
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
    User.objects.create_user(username=request.data.get('user'),email=request.data.get('mail'),first_name="hakan", last_name="akoz", password=request.data.get('pass'))
    return JsonResponse("OK", safe=False)

@api_view(['POST'])
def CreateCategory(request):
    test = category(name=request.data.get('name'), image=request.data.get('image'))
    test.save()
    return JsonResponse("OK", safe=False)

@api_view(['POST'])
def File(request):
    file = request.FILES['file']
    file_name = default_storage.save('image\\' + file.name, file)
    return JsonResponse(file_name, safe=False)

@api_view(['POST'])
def CreateBlog(request):
    _blog = blog.objects.create(category_id=request.data.get('category'), title=request.data.get('title'),slug=request.data.get('slug'),excerpt=request.data.get('excerpt'),
    content=request.data.get('content'),contentTwo=request.data.get('contentTwo'),image=request.data.get('image'),ingredients=request.data.get('ingredients'),postlabel=request.data.get('postlabel'))
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
def GetRecipe(request):
    return JsonResponse(model_to_dict(recipe.objects.get(id=request.GET.get('id'))), safe=False)

@api_view(['GET'])
def GetRecipeList(request):
    return JsonResponse(list(recipe.objects.all().values("id", "name")), safe=False)

@api_view(['GET'])
def GetRecipeItem(request):
    return JsonResponse(model_to_dict(recipeitem.objects.get(id=request.GET.get('id'))), safe=False)

@api_view(['GET'])
def GetRecipeItemList(request):
    list = []
    current = recipeitem.objects.filter(recipe=request.GET.get('recipe'))
    _food = food.objects.values_list('name', flat=True).all()
    _unit = unit.objects.values_list('name', flat=True).all()
    _recipe = recipe.objects.values_list('name', flat=True).all()
    for item in current:
        list.append({ "food" : _food.get(id=item.food) , "unit" : _unit.get(id=item.unit), "unitid":item.unit, "amount":item.amount, "recipe":_recipe.get(id=item.recipe), "recipeid": item.recipe, "metricamount":item.metricamount, "metricunit":_unit.get(id=item.metricunit), "metricunitid":item.metricunit})
    return JsonResponse(list, safe=False)

@api_view(['GET'])
def GetUnitList(request):
    return JsonResponse(list(unit.objects.all().values("id", "name", "type")), safe=False)

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
    _recipe = recipe.objects.get(id=request.GET.get('recipe'))
    _nutrition = nutrition.objects.all()
    _recipeitem = recipeitem.objects.filter(recipe=request.GET.get('recipe'))
    calorie = 0
    fat = 0
    sodium = 0
    calcium = 0
    protein = 0
    iron = 0
    carbonhydrates = 0

    for i in _recipeitem:
        __nutrition = _nutrition.filter(food=i.food).first()
        if __nutrition:
            calorie += __nutrition.calorie * i.metricamount
            fat += __nutrition.fat * i.metricamount
            sodium += __nutrition.sodium * i.metricamount
            calcium+= __nutrition.calcium * i.metricamount
            protein += __nutrition.protein * i.metricamount
            iron += __nutrition.iron * i.metricamount
            carbonhydrates += __nutrition.carbonhydrates * i.metricamount

    return JsonResponse(json.loads('{"recipe":"' + str(_recipe.name) + '","recipeid":' + str(_recipe.id) + ',"calorie":' + str(calorie) + ',"fat":' + str(fat) + ',"sodium":' + str(sodium) + ',"calcium":' + str(calcium) + ',"protein":' + str(protein) + ',"iron":' + str(iron) + ',"carbonhydrates":' + str(carbonhydrates) + '}'), safe=False)

@api_view(['POST'])
def CreateRecipe(request):
    list=request.data.get('list')
    current = recipe.objects.create(name=request.data.get('name'), blog=request.data.get('blog'))
    conversion = unitconversion.objects.all()
    for item in list:
        metricamount = item.get('amount')
        metricunit = item.get('unit')
        _conversion = conversion.filter(imperial=item.get('unit'))
        if _conversion:
            metricamount /= _conversion.first().ivalue
            metricunit = _conversion.first().metric
        recipeitem.objects.create(food=item.get('food'), unit=item.get('unit'), amount=item.get('amount'), recipe=current.id, metricamount=metricamount, metricunit=metricunit)
    return JsonResponse("ok", safe=False)

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


