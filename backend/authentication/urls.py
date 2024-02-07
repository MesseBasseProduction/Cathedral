from django.urls import path, include
from knox.views import LogoutView
from rest_framework import routers

from authentication.views import UserViewSet, LoginView, UserRegisterView, UserActivationView, \
    ResendActivationEmailView, ResetPasswordRequestView, ResetPasswordView, ValidatePasswordView, ConfirmEmailView, \
    CheckTokenView, CheckPasswordView

router = routers.DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('activate/', UserActivationView.as_view(), name='activate'),
    path('resend-activation-email/', ResendActivationEmailView.as_view(), name='resend_activation_email'),
    path('reset-password-request/', ResetPasswordRequestView.as_view(), name='reset_password_request'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('validate-password/', ValidatePasswordView.as_view(), name='validate_password'),
    path('confirm-email-change/', ConfirmEmailView.as_view(), name='confirm_email_change'),
    path('check-token/', CheckTokenView.as_view(), name='check_token'),
    path('check-password/', CheckPasswordView.as_view(), name='check_password'),
]
