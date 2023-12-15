from django.db import models

class food(models.Model):
    name = models.CharField(max_length=255)
    unit = models.IntegerField()

    def __str__(self):
        return self.name
 
class recipe(models.Model):
    name = models.CharField(max_length=255)
    blog = models.IntegerField()
 
    def __str__(self):
        return self.name
    
class nutrition(models.Model):
    calorie = models.FloatField()
    fat = models.FloatField()
    sodium = models.FloatField()
    calcium = models.FloatField()
    protein = models.FloatField()
    iron = models.FloatField()
    carbonhydrates = models.FloatField()
    food = models.IntegerField()
 
    def __str__(self):
        return self.unit
 
class recipeitem(models.Model):
    food = models.IntegerField()
    unit = models.IntegerField()
    amount = models.FloatField()
    recipe =  models.IntegerField()
    metricamount = models.IntegerField()
    metricunit = models.IntegerField()
 
    def __str__(self):
        return self.food
    
class unit(models.Model):
    name = models.CharField(max_length=255)
    type = models.IntegerField()
    
    def __str__(self):
        return self.name
 
class unittype(models.Model):
    name = models.CharField(max_length=255)
 
    def __str__(self):
        return self.name
 
class unititem(models.Model):
    imperial = models.CharField(max_length=255)
    metric = models.CharField(max_length=255)
    unit = models.IntegerField()
 
    def __str__(self):
        return self.metric
 
class unitconversion(models.Model):
    imperial = models.FloatField()
    metric = models.FloatField()
    mvalue = models.FloatField()
    ivalue = models.FloatField()
    unittype = models.IntegerField()
 
    def __str__(self):
        return self.metric

class category(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='image', null=True, blank=True)

    def __str__(self):
        return self.name

class blog(models.Model):
    POST_CHOICES = [
        ('POPULAR', 'Popular')
    ]
    category = models.ForeignKey(category, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    excerpt = models.CharField(max_length=255, default='')
    content = models.TextField(null=True, blank=True)
    contentTwo = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='image', null=True, blank=True)
    ingredients = models.TextField(null=True, blank=True)
    postlabel = models.CharField(max_length=100, choices=POST_CHOICES,null=True, blank=True)

    def __str__(self):
        return self.title
