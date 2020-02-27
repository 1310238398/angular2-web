import {Injectable} from "@angular/core";
import {HttpService} from "../http/http.Service";
import {ServelUrl} from "./ServelUrl";
import {Geography} from "./geography";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";


@Injectable()
export class AppService {
    private currentCountry: Geography;
    private currentCity: Geography;
    private currentProvince: Geography;
    private currentCounty: Geography;
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
            Router: ServelUrl.Url.querycitytype,
            Method: 'POST',
            Body: {GeographyCode: city || '', AreaType: '3'}
        })
    }

    getCityByProvince(province: string): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.querycitytype,
            Method: 'POST',
            Body: {GeographyCode: province || '', AreaType: '2'}
        });
    }

    getProviceOfChina(): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.querycitytype,
            Method: 'POST',
            Body: {AreaType: '1'}
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

    // getCampusInfo(): any {
    //     return this.http.postJSON({
    //         Router: ServelUrl.Url.querycampus,
    //         Method: 'GET',
    //         Body: {}
    //     })
    // }
}