from django.contrib import admin
from .models import Employee

class ViewInTable(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'position', 'salary']

# Register your models here.
admin.site.register(Employee, ViewInTable)
