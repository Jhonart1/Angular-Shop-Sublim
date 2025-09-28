import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Oferta } from 'src/app/core/models/oferta.model';
import { OfertasService } from 'src/app/core/services/ofertas.service';
import { Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselComponent implements OnInit {

  ofertas$!: Observable<Oferta[]>;

  swiperConfig: SwiperOptions = {
    modules: [Autoplay],
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    breakpoints: {
      600: { slidesPerView: 3, spaceBetween: 1 },
      992: { slidesPerView: 4, spaceBetween: 1 }
    }
  };

  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    this.ofertas$ = this.ofertasService.getVisibleOffers();
  }
}
