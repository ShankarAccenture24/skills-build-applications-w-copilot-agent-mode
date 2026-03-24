from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from activities.models import Activity

class Command(BaseCommand):
    help = 'Populate the database with test users and activities.'

    def handle(self, *args, **kwargs):
        # Create test users
        user1, created = User.objects.get_or_create(username='alice', defaults={'email': 'alice@example.com'})
        user1.set_password('password123')
        user1.save()
        user2, created = User.objects.get_or_create(username='bob', defaults={'email': 'bob@example.com'})
        user2.set_password('password123')
        user2.save()

        # Create test activities
        Activity.objects.get_or_create(user=user1, activity_type='Running', duration_minutes=30, calories_burned=300)
        Activity.objects.get_or_create(user=user1, activity_type='Cycling', duration_minutes=45, calories_burned=400)
        Activity.objects.get_or_create(user=user2, activity_type='Swimming', duration_minutes=60, calories_burned=500)

        self.stdout.write(self.style.SUCCESS('Test users and activities created.'))
