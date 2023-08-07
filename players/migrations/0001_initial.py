# Generated by Django 4.1.5 on 2023-08-07 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=40)),
                ('last_name', models.CharField(max_length=40)),
                ('date_of_birth', models.DateField(verbose_name='YYYY-MM-DD')),
                ('height_ft', models.PositiveIntegerField(default=6)),
                ('height_in', models.PositiveIntegerField(default=5)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(blank=True, max_length=20, null=True)),
                ('position', models.CharField(max_length=50)),
                ('is_registered', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
