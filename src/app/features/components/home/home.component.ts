import { slider } from './../../interfaces/slider.interface';
import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { IconsService } from '../../../shared/services/icons.service';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../interfaces/banner.interface';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { SliderService } from '../../services/slider.service';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/categories.interafce';
import { Course } from '../../interfaces/course.interface';
import { CourcesService } from '../../services/cources.service';
import { ToastrService } from 'ngx-toastr';
import { CoursesComponent } from './courses/courses.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule , BannerComponent,LoadingComponent,
    SliderComponent,CategoriesComponent,CoursesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, OnDestroy {

  banners: Banner[] = []
  sliders: slider[] = []
  categories: Category[] = []
  allCourses: Course[] = []
  courses: Course[] = []
  subscriptions: Subscription[] = []
  loading:boolean = false;

  constructor(
    private bannerServices: BannerService,
    public iconService: IconsService,
    private sliderService: SliderService,
    private categoriesService: CategoriesService,
    private courcesService: CourcesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const banners:Observable<any>= this.bannerServices.getBanner() ,
    sliders:Observable<any>= this.sliderService.getSlider()  ,
    categories:Observable<any>= this.categoriesService.getCategories()  ,
    allCourses:Observable<any>= this.courcesService.getCources() ;
    this.loading = true;
    this.subscriptions.push(forkJoin([banners,sliders,categories,allCourses]).subscribe({
      next:([bannersRes,slidersRes,categoriesRes,allCoursesRes])=>{
        this.banners = bannersRes.banners;
        this.sliders = slidersRes.Slider;
        this.categories = categoriesRes.Categories;
        this.allCourses = allCoursesRes.Courses;
        this.filterCources(0)
      },
      error:()=> this.toastr.error('Error occured try again later'),
      complete:()=> {this.loading = false}
    }));
    
  }

  filterCources(categoryID:number){
    if(categoryID !=0)
      this.courses = this.allCourses.filter(item => item.categoryID == categoryID)
    else
      this.courses = this.allCourses
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe();
    }
  }
}
