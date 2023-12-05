import json
from .models import blog, category
from .serializers import blogSerializer, categorySerializer
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
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
@authentication_classes([])
@permission_classes([])
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
@authentication_classes([])
@permission_classes([])
def GetCategoryList(request):
    all_users = category.objects.all().values("id", "name", "image")
    user_list = list(all_users)
    return JsonResponse(user_list, safe=False)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def CreateUser(request):
    User.objects.create_user(username=request.data.get('user'),email=request.data.get('mail'),
                              first_name="hakan", 
                              last_name="akoz", password=request.data.get('pass'))
    
    return JsonResponse("OK", safe=False)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
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
@authentication_classes([])
@permission_classes([])
def CreateBlog(request):
     blog.objects.create(category_id=request.data.get('category'), title=request.data.get('title'),slug=request.data.get('slug'),excerpt=request.data.get('excerpt'),
    content=request.data.get('content'),contentTwo=request.data.get('contentTwo'),image=request.data.get('image'),ingredients=request.data.get('ingredients'),postlabel=request.data.get('postlabel'))
     return JsonResponse("OK", safe=False)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def GetBlogList(request):
    all_blog = blog.objects.all().values("id", "name", "image")
    blog_list = list(all_blog)
    return JsonResponse(blog_list, safe=False)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def GetBlog(request):
    all_blog = blog.objects.filter(blog=2).values("id", "name", "image")
    blog_list = list(all_blog)
    return JsonResponse(blog_list, safe=False)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def Login(request):
    username=request.data.get('user')
    password=request.data.get('pass')
    user = authenticate(username=username, password=password)
    if user is not None:
        return JsonResponse(json.loads('{"token":"' + base64.b64encode(bytes(username + ":" + password, 'utf-8')).decode('utf-8') + '", "id":' + str(user.id) + ',"name":"' + user.username + '"}'), safe=False)
    return JsonResponse("Wrong User or Password", safe=False)

