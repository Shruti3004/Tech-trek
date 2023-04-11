from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from accounts.api.views import (
    PlayerRegisterAPIView,
    PlayerListAPIView,
    PlayerDashboardAPIView,
    VerifyEmailView,
)

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/register/", PlayerRegisterAPIView.as_view(), name="register"),
    path("api/list/", PlayerListAPIView.as_view(), name="player-list"),
    path("api/", PlayerDashboardAPIView.as_view(), name="dashboard"),
    # path('api/register/verify-email/', VerifyEmailView.as_view(), name='api_verify_email'),
    path('verify-email/<str:uidb64>/<str:token>/', VerifyEmailView.as_view(), name='verify_email'),
]
