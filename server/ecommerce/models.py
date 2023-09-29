from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class Base(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(db_index=True,default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:             
        abstract = True


class Category(Base):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(Base):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.ImageField(
        upload_to="ProductImages/", null=True, blank=True, default="noimage.png"
    )
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    stock = models.IntegerField()
    price = models.FloatField()
    digital = models.BooleanField(default=False, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name


class Order(Base):
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False, null=True, blank=True)
    transaction_id = models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.id)


class OrderItem(Base):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)


class ShippingAddress(Base):
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    street_address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=10)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.street_address
