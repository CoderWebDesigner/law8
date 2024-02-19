import { inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { LanguageService } from '@core/services';

const _languageService= new LanguageService()
export const API_Data = {
  '3': { api: API_Config.clientGroup, title: _languageService.getTransValue('common.clientGroup') },
  '8': { api: API_Config.practiceArea, title: _languageService.getTransValue('common.practiceArea') },
  '9': { api: API_Config.department, title: _languageService.getTransValue('') },
  '10': { api: API_Config.industry, title: _languageService.getTransValue('') },
};
