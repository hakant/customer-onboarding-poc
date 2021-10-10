import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdCheckStatus, OnboardingState } from '@customer-onboarding/data';

@Component({
  selector: 'customer-onboarding-id-check',
  templateUrl: './id-check.component.html',
  styleUrls: ['./id-check.component.scss']
})
export class IdCheckComponent implements OnInit {
  IdCheckStatus = IdCheckStatus;
  Object = Object;

  title = 'idcheck';
  currentEvent = IdCheckStatus.Initial;

  onboardingId: string;
  idCheckId: string;
  idCheckIndex: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.onboardingId = this.activatedRoute.snapshot.paramMap.get('onboardingId');
    this.idCheckId = this.activatedRoute.snapshot.paramMap.get('idCheckId');
    this.idCheckIndex = this.activatedRoute.snapshot.paramMap.get('idCheckIndex');
  }

  ngOnInit(): void {
    this.httpClient.get(`https://localhost:5001/onboarding/${this.onboardingId}`)
      .subscribe((response: { onboardingWorkflow: OnboardingState }) => {
        this.currentEvent = response.onboardingWorkflow.idCheckWorkflows.find(
          i => i.idCheckWorkflowId === this.idCheckId
        )?.status ?? IdCheckStatus.Initial;
      });
  }

  handleIdCheckEvent(event: IdCheckStatus) {
    this.httpClient.put(`https://localhost:5001/onboarding/${this.onboardingId}/${this.idCheckId}/${this.idCheckIndex}`,
      {
        status: event
      }).subscribe(() => {
        this.currentEvent = event;
      });
  }
}
