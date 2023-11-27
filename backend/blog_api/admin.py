from django.contrib import admin
from .models import category,blog
# Register your models here.

class blogAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('title',)}

admin.site.register(category)
admin.site.register(blog,blogAdmin)