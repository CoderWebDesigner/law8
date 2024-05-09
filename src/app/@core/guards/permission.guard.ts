import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LanguageService, ToasterService } from '@core/services';
import { PermissionService } from '@core/services/permission.service';

export const permissionGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const _router = inject(Router);
  const _permissionService = inject(PermissionService);
  const _toastrNotifiService = inject(ToasterService);
  const _languageService = inject(LanguageService);
  const requiredPermission = next.data['permission'];
  if (
    requiredPermission &&
    !_permissionService.hasPermission(requiredPermission)
  ) {
    _router.navigate(['/dashboard']);
    _toastrNotifiService.displayErrorToastr(
      _languageService.getTransValue('messages.youDontHavePermission')
    );

    return false;
  }
  return true;
};
