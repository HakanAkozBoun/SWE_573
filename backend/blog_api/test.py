from django.test import TestCase
from blog_api.models import category

class BasicTest(TestCase):
    def test_entry(self):
        cat=category()
        cat.name="TestCategory"
        cat.save()


        record=category.objects.get(pk=cat.id)
        self.assertEqual(record,cat)