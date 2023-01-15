import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie.model';
import { TvShow } from '../models/tvshow.model';
import { Person } from '../models/person.model';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieComponent } from '../modals/movie/movie.component';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  // movies
  top20Movies: Movie[];
  private movieSub: Subscription;
  showMovies = false;

  // series
  top20Shows: TvShow[];
  private tvshowSub: Subscription;
  showTvShows = false;

  // people
  top20Persons: Person[];
  private personSub: Subscription;
  showPersons = false;

  // details
  private detailsSub: Subscription;
  // search
  private searchSub: Subscription;
  searchResults: any;

  constructor(private movieService: MovieService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getTopMovies();
  }
  getTopMovies() {
    this.showMovies = true;
    this.showTvShows = false;
    this.showPersons = false;
    if (!this.top20Movies) {
      this.movieService.getMovies();
      // will get initial array of movies from server
      this.movieSub = this.movieService.getMovieUpdateListener()
        .subscribe(movieData => this.top20Movies = movieData.filter(m => m.voteaverage >= 7.7));
    }
  }
  getTopShows() {
    this.showTvShows = true;
    this.showMovies = false;
    this.showPersons = false;
    if (!this.top20Shows) {
      this.movieService.getTvShows();
      // will get initial array of tv shows from server
       this.top20Shows = [];
    }
  }
  getTopPersons() {
    this.showPersons = true;
    this.showMovies = false;
    this.showTvShows = false;
    if (!this.top20Persons) {
      this.movieService.getPersons();
      // will get initial array of persons from server
       this.top20Persons = [];
    }
  }
  getDetails(id: string, type: string) {
    this.movieService.getSingleDetails(id, type);
    this.detailsSub = this.movieService.getSingleDetailsUpdateListener()
        .subscribe(currentData => {
          this.openModal(currentData, type);
        });
  }
  openModal(currentData: any, type: string) {
    // unsubscribe
    this.detailsSub.unsubscribe();
    // set component
    let oComponent: any;
    switch (type) {
      case 'movie':
        oComponent = MovieComponent;
        break;
    }
    // open modal with component as content and pass details
    const modalRef =  this.modalService.open(oComponent, { size: 'lg', centered: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.data = currentData;
  }
  onSearch(event: any) {
    const searchString = event.target.value;
    if (searchString) {
      this.showPersons = true;
      this.showMovies = true;
      this.showTvShows = true;
      // get value from input
      this.movieService.getSearch(searchString);
      this.searchSub = this.movieService.getSearchUpdateListener()
        .subscribe(currentData => {
          this.searchResults = currentData.filter(m => m.vote_average >= 8);
          console.log(this.searchResults);
          // unsub
          this.searchSub.unsubscribe();
        });
    } else {
      this.searchResults = null;
      this.getTopMovies();
    }
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // unsubscribe all
    this.movieSub.unsubscribe();
    this.tvshowSub.unsubscribe();
    this.personSub.unsubscribe();
    this.detailsSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

}
