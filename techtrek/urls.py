from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from .settings import MEDIA_ROOT, MEDIA_URL

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("rest_framework.urls")),
    path("accounts/", include("accounts.api.urls")),
    path("questions/", include("questions.api.urls")),
    path("badges/", include("badges.api.urls")),
    # path("payment/", include("payments.urls")),
] + static(MEDIA_URL, document_root=MEDIA_ROOT)
