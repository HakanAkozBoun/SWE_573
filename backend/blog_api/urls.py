from django.urls import path, include
from .views import blogApiView, categoryApiView, CategoryPostApiView, PopularPostsApiView, GetUserList, CreateUser, CreateCategory, GetCategoryList, Login,CreateBlog,GetBlog,UpdateUser, GetUser, File, GetUnitItemList, GetFoodList, GetRecipeItemList, GetRecipeList, GetUnitTypeList, GetFood, GetRecipe, GetRecipeItem, GetUnitType, GetUnitItem, GetUnitConversionList, GetUnitList, CreateRecipe, GetNutrition
from rest_framework import routers

router = routers.SimpleRouter()
router.register('blogs', blogApiView, basename='blogs')
router.register('category', categoryApiView, basename='category')
router.register('categoryBasedBlogs', CategoryPostApiView, basename='categoryBasedBlogs')
router.register('PopularPostsApiView', PopularPostsApiView, basename='PopularPostsApiView')

urlpatterns = [
    path('', include(router.urls)),
    path('UserList/', GetUserList, name='UserList'),
    path('UnitItemList/', GetUnitItemList, name='UnitItemList'),
    path('UnitItem/', GetUnitItem, name='UnitItem'),
    path('UnitList/', GetUnitList, name='UnitList'),
    path('Food/', GetFood, name='Food'),
    path('FoodList/', GetFoodList, name='FoodList'),
    path('RecipeItemList/', GetRecipeItemList, name='RecipeItemList'),
    path('RecipeItem/', GetRecipeItem, name='RecipeItem'),
    path('RecipeList/', GetRecipeList, name='RecipeList'),
    path('Recipe/', GetRecipe, name='Recipe'),
    path('CreateRecipe/', CreateRecipe, name='CreateRecipe'),
    path('UnitTypeList/', GetUnitTypeList, name='UnitTypeList'),
    path('UnitType/', GetUnitType, name='UnitType'),
    path('Nutrition/', GetNutrition, name='Nutrition'),
    path('UnitConversionList/', GetUnitConversionList, name='UnitConversionList'),
    path('CreateUser/', CreateUser, name='CreateUser'),
    path('CategoryList/', GetCategoryList, name='CategoryList'),
    path('CreateCategory/', CreateCategory, name='CreateCategory'),
    path('Login/', Login, name='Login'),
    path('CreateBlog/', CreateBlog, name='CreateBlog'),
    path('GetBlog/', GetBlog, name='GetBlog'),
    path('UpdateUser/', UpdateUser, name='UpdateUser'),
    path('GetUser/', GetUser, name='GetUser'),
    path('File/', File, name='File')
]