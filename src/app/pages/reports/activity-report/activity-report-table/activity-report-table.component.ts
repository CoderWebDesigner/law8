import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-report-table',
  templateUrl: './activity-report-table.component.html',
  styleUrls: ['./activity-report-table.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ActivityReportTableComponent {
  // data: any[] = [
  //   {
  //     date: '29-7-2024',
  //     jurisdiction: [
  //       {
  //         name: 'Abu Dhabi   أبوظبي',
  //         stages: [
  //           {
  //             name: 'Appeal   إستئناف',
  //             sessions: [
  //               {
  //                 name: 'Hearing Session',
  //                 parties: [{}],
  //               },
  //             ],
  //           },
  //           {
  //             name: 'Appeal   إستئناف 2',
  //             sessions: [
  //               {
  //                 name: 'Hearing Session',
  //                 parties: [{}],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Abu Dhabi   أبوظبي 2',
  //         stages: [
  //           {
  //             name: 'Appeal   إستئناف',
  //             sessions: [
  //               {
  //                 name: 'Hearing Session',
  //                 parties: [{}],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

    data = [
      {
        date: '29-7-2024',
        jurisdictions: [
          {
            name: 'Abu Dhabi',
            stages: [
              {
                name: 'First Instance',
                cases: [
                  {
                    lawyer: 'Mohamed Lemine',
                    hearingSession: '28-07-2024 | 09:00 , Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium harum mollitia velit eum facilis! Nesciunt aperiam, hic enim, assumenda veritatis vero debitis corrupti sint est consequatur quidem asperiores ut? Rem?'
                    
                    ,
                    previousHearingSession: '08-07-2024',
                    previousHearingSessionInfo: 'For expert report - لورود التقرير',
                    caseParties: [
                      '(الخصم) | Appellant - المستأنف || المستشفى الإيرانى ? دبى',
                      '(الموكل) | Res - Appeal - المستأنف ضده || شركة الاتحاد للتأمين'
                    ],
                    caseInfo: {
                      caseNumber: '188/2024 تركات عجمان',
                      caseType: 'Family Estates - أسرة تركات',
                      instance: 'First Instance - إبتدائي',
                      location: 'Ajman - عجمان',
                      link: '01625-001'
                    }
                  },
                  {
                    lawyer: 'Ibrahim Jarjoura',
                    hearingSession: '28-07-2024 | 10:00',
                    previousHearingSession: '08-07-2024',
                    previousHearingSessionInfo: 'For another report - تقرير آخر',
                    caseParties: [
                      '(الخصم) | Appellant - المستأنف || شركة XYZ',
                      '(الموكل) | Res - Appeal - المستأنف ضده || شركة ABC'
                    ],
                    caseInfo: {
                      caseNumber: '189/2024 تركات أبوظبي',
                      caseType: 'Business Dispute - نزاع تجاري',
                      instance: 'First Instance - إبتدائي',
                      location: 'Abu Dhabi - أبوظبي',
                      link: '01625-002'
                    }
                  }
                ]
              },
              {
                name: 'Second Instance',
                cases: [
                  {
                    lawyer: 'Fatima Al Marri',
                    hearingSession: '29-07-2024 | 09:00',
                    previousHearingSession: '08-07-2024',
                    previousHearingSessionInfo: 'Follow-up session - متابعة الجلسة',
                    caseParties: [
                      '(الخصم) | Appellant - المستأنف || شركة LMN',
                      '(الموكل) | Res - Appeal - المستأنف ضده || شركة OPQ'
                    ],
                    caseInfo: {
                      caseNumber: '190/2024 تركات الشارقة',
                      caseType: 'Criminal Case - قضية جنائية',
                      instance: 'Second Instance - استئناف',
                      location: 'Sharjah - الشارقة',
                      link: '01625-003'
                    }
                  }
                ]
              }
            ]
          },
          {
            name: 'Dubai',
            stages: [
              {
                name: 'First Instance',
                cases: [
                  {
                    lawyer: 'Ahmad Al Nahyan',
                    hearingSession: '30-07-2024 | 11:00',
                    previousHearingSession: '10-07-2024',
                    previousHearingSessionInfo: 'Initial hearing - الجلسة الأولية',
                    caseParties: [
                      '(الخصم) | Appellant - المستأنف || شركة DEF',
                      '(الموكل) | Res - Appeal - المستأنف ضده || شركة GHI'
                      // More parties...
                    ],
                    caseInfo: {
                      caseNumber: '191/2024 تركات دبي',
                      caseType: 'Civil Case - قضية مدنية',
                      instance: 'First Instance - إبتدائي',
                      location: 'Dubai - دبي',
                      link: '01625-004'
                    }
                  }
                  // More cases...
                ]
              }
              // More stages...
            ]
          }
        ]
      },
      {
        date: '30-7-2024',
        jurisdictions: [
          {
            name: 'Sharjah',
            stages: [
              {
                name: 'First Instance',
                cases: [
                  {
                    lawyer: 'Layla Al Hashmi',
                    hearingSession: '30-07-2024 | 10:00',
                    previousHearingSession: '15-07-2024',
                    previousHearingSessionInfo: 'Evidence submission - تقديم الأدلة',
                    caseParties: [
                      '(الخصم) | Appellant - المستأنف || شركة JKL',
                      '(الموكل) | Res - Appeal - المستأنف ضده || شركة MNO'
                      // More parties...
                    ],
                    caseInfo: {
                      caseNumber: '192/2024 تركات الشارقة',
                      caseType: 'Family Case - قضية أسرية',
                      instance: 'First Instance - إبتدائي',
                      location: 'Sharjah - الشارقة',
                      link: '01625-005'
                    }
                  }
                  // More cases...
                ]
              }
              // More stages...
            ]
          }
          // More jurisdictions...
        ]
      }
      // More dates...
    ];
  }
  

