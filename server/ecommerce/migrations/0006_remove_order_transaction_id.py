# Generated by Django 4.2.5 on 2023-10-03 11:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0005_category_created_at_category_updated_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='transaction_id',
        ),
    ]
