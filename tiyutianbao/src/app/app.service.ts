import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.Service";
import { ServelUrl } from "./ServelUrl";
import { Geography } from "./geography";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";


@Injectable()
export class AppService {
    private currentCountry: Geography;
    private currentProvince: Geography;
    private currentCounty: Geography;
    private currentCity: Geography;
    private currentStreet: Geography;
    private currentRegion: Geography;


    private currentParentPage = '';
    private subject = new Subject<any>();

    send(message: any) {
        this.subject.next(message);
    }

    get(): Observable<any> {
        return this.subject.asObservable();
    }
    constructor(private http: HttpService) {
    }

    postFamilyInfoToServer(formData: any, callBack) {
        this.http.postFormData(formData, callBack);
    }

    getCountyByCity(city: string): Promise<any> {
        return this.http.postJSON({
            // Router: ServelUrl.Url.querycitytype,
            Router: ServelUrl.Url.geographyinit,
            Method: 'POST',
            Body: { GeographyCode: city || '', AreaType: '3' }
        })
    }

    getCityByProvince(province: string): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.geographyinit,
            Method: 'POST',
            Body: { GeographyCode: province || '', AreaType: '2' }
        });
    }

    getProviceOfChina(): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.geographyinit,
            Method: 'POST',
            Body: { AreaType: '1' }
        })
    }

    getProviceOfHouse(): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.geographyhouse,
            Method: 'POST',
            Body: { AreaType: '1' }
        })
    }

    getCityByHouseProvince(province: string): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.geographyhouse,
            Method: 'POST',
            Body: { GeographyCode: province || '', AreaType: '2' }
        });
    }

    getCountyByHouseCity(city: string): Promise<any> {
        return this.http.postJSON({
            // Router: ServelUrl.Url.querycitytype,
            Router: ServelUrl.Url.geographyhouse,
            Method: 'POST',
            Body: { GeographyCode: city || '', AreaType: '3' }
        })
    }

    getStreetByHouseCounty(county: string): Promise<any> {
        return this.http.postJSON({
            // Router: ServelUrl.Url.querycitytype,
            Router: ServelUrl.Url.geographyhouse,
            Method: 'POST',
            Body: { GeographyCode: county || '', AreaType: '4' }
        })
    }

    getRegionByHouseStreet(street: string): Promise<any> {
        return this.http.postJSON({
            // Router: ServelUrl.Url.querycitytype,
            Router: ServelUrl.Url.geographyhouse,
            Method: 'POST',
            Body: { GeographyCode: street || '', AreaType: '5' }
        })
    }


    setCurrentCountry(country: Geography) {
        this.currentCountry = country;
    }

    setCurrentParentPage(page) {
        this.currentParentPage = page;
    }

    setCurrentProvince(province: Geography) {
        this.currentProvince = province;
    }

    setCurrentCounty(county: Geography) {
        this.currentCounty = county;
    }

    setCurrentCity(city: Geography) {
        this.currentCity = city;
    }

    setCurrentStreet(street: Geography) {
        this.currentStreet = street;
    }

    setCurrentRegion(region: Geography) {
        this.currentRegion = region;
    }

    getCurrentParentPage() {
        return this.currentParentPage
    }

    getCurrentCountry(): Geography {
        return this.currentCountry;
    }

    getCurrentProvince(): Geography {
        return this.currentProvince;
    }

    getCurrentCity(): Geography {
        return this.currentCity;
    }

    getCurrentCounty(): Geography {
        return this.currentCounty;
    }

    getCurrentStreet(): Geography {
        return this.currentStreet;
    }

    getCurrentRegion(): Geography {
        return this.currentRegion;
    }


    // getCampusInfo(): any {
    //     return this.http.postJSON({
    //         Router: ServelUrl.Url.querycampus,
    //         Method: 'GET',
    //         Body: {}
    //     })
    // }
}