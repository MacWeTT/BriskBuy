# Generated by Django 4.2.3 on 2023-08-23 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0003_alter_order_customer_alter_shippingaddress_customer_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingaddress',
            name='order',
        ),
    ]
