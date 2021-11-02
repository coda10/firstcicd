
from django.db import models

# Create your models here.
class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    position = models.CharField(max_length=200)
    salary = models.IntegerField()

    def __str__(self):
        return self.first_name 
    

