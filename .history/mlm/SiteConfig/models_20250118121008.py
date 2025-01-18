from django.db import models

class Siteconfig ():
    navbar_title = models.CharField(max_length=200)
    navbar_image= models.CharField()