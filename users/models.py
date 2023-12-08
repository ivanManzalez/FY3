# from django.contrib.auth.base_user import BaseUserManager
# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
# from django.db import models
# # from .usermanager import UserManager  # Assuming UserManager is defined in usermanager module

# # 
# class UserManager(BaseUserManager):
  
#   # INPUT: username, password, **other_fields
#   def create_user(self, email, password=None):
#     if not email:
#       raise ValueError("An email is required")
#     if not password:
#       raise ValueError("A password is requred") 

#     email = self.normalize_email(email)
#     user = self.model(email=email)
#     user.set_password(password)
#     user.save()
#     return user
  
#   def create_superuser(self, email, password=None):
#     if not email:
#       raise ValueError("An email is required")
#     if not password:
#       raise ValueError("A password is requred") 

#     user = self.create_user(email, password)
#     user.is_superuser = True
#     user.save()
#     return user

# class User(AbstractBaseUser, PermissionsMixin):
#   user_id = models.AutoField(primary_key = True)
#   email = models.EmailField(max_length=100, unique = True)
#   username = models.CharField(max_length=50)
#   phone = models.CharField(max_length=12)
#   date_joined = models.DateField(auto_now_add = True)

#   is_active = models.BooleanField(default=True)
#   is_staff = models.BooleanField(default=False)
#   is_superuser = models.BooleanField(default=False)


#   USERNAME_FIELD = "email"
#   REQUIRED_FIELDS = ["username"]

#   objects = UserManager()

#   def __str__(self):
#     return self.username