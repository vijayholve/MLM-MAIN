from django.db import models

class Siteconfig (models.Model):
    navbar_title = models.CharField(max_length=200)
    navbar_image= models.ImageField(upload_to="Siteconfig/")
    headers_name = models.CharField(max_length=100)
    footer_text = models.TextField(blank=True, null=True)  # New field for footer text
    contact_email = models.EmailField(blank=True, null=True) 
    contact_number =models.IntegerField(blank=True,null=True) 
    
    def __str__(self):
        return f"{self.navbar_title}" 
    