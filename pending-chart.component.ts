import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { ActionMassiveService, FilterService, UserService } from '../../services';
import { RealtimeService } from '../services';
import { map, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-chart',
  templateUrl: 'pending-chart.component.html',
  styleUrls: ['pending-chart.component.scss']
})
export class PendingChartComponent implements OnInit {
  @ViewChild('oneList') oneList: ElementRef;
  @Output() checkLoaded = new EventEmitter();
  public show = false;
  public companies: any[];
  public chart: any;
  public idCompanies: number[];
  public external = true;
  public disabled = false;
  constructor(
    private filterService: FilterService,
    private render: Renderer2,
    private realtimeService: RealtimeService,
    private router: Router,
    private userService: UserService,
    private actionMassiveService: ActionMassiveService
  ) {}
  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    const validateLetter = new RegExp('^[A-Z]{1}?');
    if (!validateLetter.test(event.key)) {
      if (this.show) {
        this.searchArr(this.companies, event.key, this.oneList);
      }
    }
  }
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (res) => {
        this.external = res.user.external;
        if (!this.external) {
          let companiesChecked = [];
          this.filterService
            .getChart(null)
            .pipe(
              flatMap((chart: any) => {
                this.chart = chart;
                this.checkLoaded.emit(true);
                companiesChecked = chart.companies.map((cmp) => cmp.id);
                return this.filterService.getCompanies();
              }),
              map((companies) => {
                return companies.map((cmp) => {
                  cmp.checked = companiesChecked.indexOf(cmp.id) !== -1 ? true : false;
                  return cmp;
                });
              })
            )
            .subscribe(
              (companies) => {
                const newArr = companies.map((val) => {
                  val.letter = false;
                  return val;
                });
                this.companies = newArr;
                if (!this.show) {
                  const copyCompanies = [];
                  for (let i = this.companies.length - 1; i >= 0; i--) {
                    if (this.companies[i].checked) {
                      copyCompanies.unshift({ ...this.companies[i] });
                      this.companies.splice(i, 1);
                    }
                  }
                  this.companies = copyCompanies.concat(this.companies);
                  this.idCompanies = copyCompanies.map((cc) => cc.id);
                }
              },
              (err) => {
                this.actionMassiveService.activeSnackbarError();
              }
            );
        }
      },
      (err) => {
        this.actionMassiveService.activeSnackbarError();
      }
    );
  }
  searchArr(arr, letter, box): void {
    if (arr) {
      const arrFilter = [];
      arr.forEach((val) => {
        if (val.name[0].split()[0] !== letter.toUpperCase()) {
          return;
        }
        arrFilter.push(val);
      });
      if (arrFilter[0]) {
        const indexElement = arr.findIndex((val) => val.name === arrFilter[0].name);
        if (indexElement !== -1) {
          arr.forEach((val) => (val.letter = false));
          arr[indexElement].letter = true;
          box.nativeElement.scrollTop = box.nativeElement.children[indexElement].offsetTop;
        }
      }
    }
  }
  openSelect(): void {
    this.show = !this.show;
    if (!this.show) {
      const copyCompanies = [];
      for (let i = this.companies.length - 1; i >= 0; i--) {
        if (this.companies[i].checked) {
          copyCompanies.unshift({ ...this.companies[i] });
          this.companies.splice(i, 1);
        }
      }
      this.companies = copyCompanies.concat(this.companies);
      this.idCompanies = copyCompanies.map((cc) => cc.id);
      this.filterService.getChart(this.idCompanies).subscribe(
        (res) => {
          this.chart = res;
          this.disabled = this.chart.length === 0 ? true : false;
        },
        (err) => {
          this.actionMassiveService.activeSnackbarError();
        }
      );
    }
  }
  selectCompany(company): void {
    const countCompany = this.companies.filter((cmp) => cmp.checked).length;
    if (countCompany >= 5 && !company.checked) {
      return;
    }
    company.checked = !company.checked;
  }
  showDetailPending(eve): void {
    eve.stopPropagation();
    const item = eve.currentTarget;
    this.render.addClass(item, 'total_bar-delay--active');
  }
  hideDetailPending(eve): void {
    eve.stopPropagation();
    const item = eve.currentTarget;
    this.render.removeClass(item, 'total_bar-delay--active');
  }
  showDetailTotal(eve): void {
    eve.stopPropagation();
    const item = eve.currentTarget;
    this.render.addClass(item, 'total_bar--active');
  }
  hideDetailTotal(eve): void {
    eve.stopPropagation();
    const item = eve.currentTarget;
    this.render.removeClass(item, 'total_bar--active');
  }
  showDetailBar(eve): void {
    eve.stopPropagation();
    const item = eve.currentTarget;
    this.render.addClass(item, 'bars-item--active');
  }
  hideDetailBar(eve): void {
    eve.stopPropagation();
    const item = eve.currentTarget;
    this.render.removeClass(item, 'bars-item--active');
  }
  goDetail(item): void {
    if (!item) {
      return;
    }
    this.realtimeService.data.next({
      chart: 5,
      data: {
        idCompany: [item.id]
      }
    });
    this.router.navigate(['dashboard', 'realtime', 'inbox-charts']);
  }
  goDetailAll(): void {
    if (!this.idCompanies) {
      return;
    }
    this.realtimeService.data.next({
      chart: 5,
      data: {
        idCompany: this.idCompanies
      }
    });
    this.router.navigate(['dashboard', 'realtime', 'inbox-charts']);
  }
}
