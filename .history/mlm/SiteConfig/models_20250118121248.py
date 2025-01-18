from django.db import models

class Siteconfig ():
    navbar_title = models.CharField(max_length=200)
    navbar_image= models.ImageField(upload_to="/Siteconfig")
    headers_name = models.CharField(max_length=100)
    def __str__(self):
        return f""