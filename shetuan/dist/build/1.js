webpackJsonp([1],{

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShetuanInfoPageModule", function() { return ShetuanInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shetuaninfo__ = __webpack_require__(325);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ShetuanInfoPageModule = /** @class */ (function () {
    function ShetuanInfoPageModule() {
    }
    ShetuanInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__shetuaninfo__["a" /* ShetuanInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__shetuaninfo__["a" /* ShetuanInfoPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__shetuaninfo__["a" /* ShetuanInfoPage */]
            ]
        })
    ], ShetuanInfoPageModule);
    return ShetuanInfoPageModule;
}());

//# sourceMappingURL=shetuaninfo.module.js.map

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {

    var debug = false;

    var root = this;

    var EXIF = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    if (true) {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }

    var ExifTags = EXIF.Tags = {

        // version tags
        0x9000 : "ExifVersion",             // EXIF version
        0xA000 : "FlashpixVersion",         // Flashpix format version

        // colorspace tags
        0xA001 : "ColorSpace",              // Color space information tag

        // image configuration
        0xA002 : "PixelXDimension",         // Valid width of meaningful image
        0xA003 : "PixelYDimension",         // Valid height of meaningful image
        0x9101 : "ComponentsConfiguration", // Information about channels
        0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

        // user information
        0x927C : "MakerNote",               // Any desired information written by the manufacturer
        0x9286 : "UserComment",             // Comments by user

        // related file
        0xA004 : "RelatedSoundFile",        // Name of related sound file

        // date and time
        0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
        0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
        0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
        0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
        0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

        // picture-taking conditions
        0x829A : "ExposureTime",            // Exposure time (in seconds)
        0x829D : "FNumber",                 // F number
        0x8822 : "ExposureProgram",         // Exposure program
        0x8824 : "SpectralSensitivity",     // Spectral sensitivity
        0x8827 : "ISOSpeedRatings",         // ISO speed rating
        0x8828 : "OECF",                    // Optoelectric conversion factor
        0x9201 : "ShutterSpeedValue",       // Shutter speed
        0x9202 : "ApertureValue",           // Lens aperture
        0x9203 : "BrightnessValue",         // Value of brightness
        0x9204 : "ExposureBias",            // Exposure bias
        0x9205 : "MaxApertureValue",        // Smallest F number of lens
        0x9206 : "SubjectDistance",         // Distance to subject in meters
        0x9207 : "MeteringMode",            // Metering mode
        0x9208 : "LightSource",             // Kind of light source
        0x9209 : "Flash",                   // Flash status
        0x9214 : "SubjectArea",             // Location and area of main subject
        0x920A : "FocalLength",             // Focal length of the lens in mm
        0xA20B : "FlashEnergy",             // Strobe energy in BCPS
        0xA20C : "SpatialFrequencyResponse",    //
        0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
        0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
        0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
        0xA214 : "SubjectLocation",         // Location of subject in image
        0xA215 : "ExposureIndex",           // Exposure index selected on camera
        0xA217 : "SensingMethod",           // Image sensor type
        0xA300 : "FileSource",              // Image source (3 == DSC)
        0xA301 : "SceneType",               // Scene type (1 == directly photographed)
        0xA302 : "CFAPattern",              // Color filter array geometric pattern
        0xA401 : "CustomRendered",          // Special processing
        0xA402 : "ExposureMode",            // Exposure mode
        0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
        0xA404 : "DigitalZoomRation",       // Digital zoom ratio
        0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
        0xA406 : "SceneCaptureType",        // Type of scene
        0xA407 : "GainControl",             // Degree of overall image gain adjustment
        0xA408 : "Contrast",                // Direction of contrast processing applied by camera
        0xA409 : "Saturation",              // Direction of saturation processing applied by camera
        0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
        0xA40B : "DeviceSettingDescription",    //
        0xA40C : "SubjectDistanceRange",    // Distance to subject

        // other tags
        0xA005 : "InteroperabilityIFDPointer",
        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100 : "ImageWidth",
        0x0101 : "ImageHeight",
        0x8769 : "ExifIFDPointer",
        0x8825 : "GPSInfoIFDPointer",
        0xA005 : "InteroperabilityIFDPointer",
        0x0102 : "BitsPerSample",
        0x0103 : "Compression",
        0x0106 : "PhotometricInterpretation",
        0x0112 : "Orientation",
        0x0115 : "SamplesPerPixel",
        0x011C : "PlanarConfiguration",
        0x0212 : "YCbCrSubSampling",
        0x0213 : "YCbCrPositioning",
        0x011A : "XResolution",
        0x011B : "YResolution",
        0x0128 : "ResolutionUnit",
        0x0111 : "StripOffsets",
        0x0116 : "RowsPerStrip",
        0x0117 : "StripByteCounts",
        0x0201 : "JPEGInterchangeFormat",
        0x0202 : "JPEGInterchangeFormatLength",
        0x012D : "TransferFunction",
        0x013E : "WhitePoint",
        0x013F : "PrimaryChromaticities",
        0x0211 : "YCbCrCoefficients",
        0x0214 : "ReferenceBlackWhite",
        0x0132 : "DateTime",
        0x010E : "ImageDescription",
        0x010F : "Make",
        0x0110 : "Model",
        0x0131 : "Software",
        0x013B : "Artist",
        0x8298 : "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000 : "GPSVersionID",
        0x0001 : "GPSLatitudeRef",
        0x0002 : "GPSLatitude",
        0x0003 : "GPSLongitudeRef",
        0x0004 : "GPSLongitude",
        0x0005 : "GPSAltitudeRef",
        0x0006 : "GPSAltitude",
        0x0007 : "GPSTimeStamp",
        0x0008 : "GPSSatellites",
        0x0009 : "GPSStatus",
        0x000A : "GPSMeasureMode",
        0x000B : "GPSDOP",
        0x000C : "GPSSpeedRef",
        0x000D : "GPSSpeed",
        0x000E : "GPSTrackRef",
        0x000F : "GPSTrack",
        0x0010 : "GPSImgDirectionRef",
        0x0011 : "GPSImgDirection",
        0x0012 : "GPSMapDatum",
        0x0013 : "GPSDestLatitudeRef",
        0x0014 : "GPSDestLatitude",
        0x0015 : "GPSDestLongitudeRef",
        0x0016 : "GPSDestLongitude",
        0x0017 : "GPSDestBearingRef",
        0x0018 : "GPSDestBearing",
        0x0019 : "GPSDestDistanceRef",
        0x001A : "GPSDestDistance",
        0x001B : "GPSProcessingMethod",
        0x001C : "GPSAreaInformation",
        0x001D : "GPSDateStamp",
        0x001E : "GPSDifferential"
    };

     // EXIF 2.3 Spec
    var IFD1Tags = EXIF.IFD1Tags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0201: "JpegIFOffset",    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
        0x0202: "JpegIFByteCount", // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            img.exifdata = data || {};
            var iptcdata = findIPTCinJPEG(binFile);
            img.iptcdata = iptcdata || {};
            if (EXIF.isXmpEnabled) {
               var xmpdata= findXMPinJPEG(binFile);
               img.xmpdata = xmpdata || {};               
            }
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if(nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    // Check if we already stored a value with this name
                    if(data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    /**
    * Given an IFD (Image File Directory) start offset
    * returns an offset to next IFD or 0 if it's the last IFD.
    */
    function getNextIFDOffset(dataView, dirStart, bigEnd){
        //the first 2bytes means the number of directory entries contains in this IFD
        var entries = dataView.getUint16(dirStart, !bigEnd);

        // After last directory entry, there is a 4bytes of data,
        // it means an offset to next IFD.
        // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

        return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
    }

    function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd){
        // get the IFD1 offset
        var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart+firstIFDOffset, bigEnd);

        if (!IFD1OffsetPointer) {
            // console.log('******** IFD1Offset is empty, image thumb not found ********');
            return {};
        }
        else if (IFD1OffsetPointer > dataView.byteLength) { // this should not happen
            // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
            return {};
        }
        // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);

        var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd)

        // EXIF 2.3 specification for JPEG format thumbnail

        // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
        // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
        // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
        // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
        // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

        if (thumbTags['Compression']) {
            // console.log('Thumbnail image found!');

            switch (thumbTags['Compression']) {
                case 6:
                    // console.log('Thumbnail image format is JPEG');
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                    // extract the thumbnail
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                            type: 'image/jpeg'
                        });
                    }
                break;

            case 1:
                console.log("Thumbnail image format is TIFF, which is not implemented.");
                break;
            default:
                console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
            }
        }
        else if (thumbTags['PhotometricInterpretation'] == 2) {
            console.log("Thumbnail image format is RGB, which is not implemented.");
        }
        return thumbTags;
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        // extract thumbnail
        tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

        return tags;
    }

   function findXMPinJPEG(file) {

        if (!('DOMParser' in self)) {
            // console.warn('XML parsing not supported without DOMParser');
            return;
        }
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
           if (debug) console.log("Not a valid JPEG");
           return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < (length-4)) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(dataView, startOffset, sectionLength)
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring( xmpString.indexOf( '<x:xmpmeta' ), xmpEndIndex );

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10
                //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                //Without these namespaces, XML is thought to be invalid by parsers
                xmpString = xmpString.slice(0, indexOfXmp)
                            + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                            + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                            + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                            + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '
                            + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                            + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                            + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                            + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                            + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '
                            + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '
                            + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                            + xmpString.slice(indexOfXmp)

                var domDocument = dom.parseFromString( xmpString, 'text/xml' );
                return xml2Object(domDocument);
            } else{
             offset++;
            }
        }
    }

    function xml2json(xml) {
        var json = {};
      
        if (xml.nodeType == 1) { // element node
          if (xml.attributes.length > 0) {
            json['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              json['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) { // text node
          return xml.nodeValue;
        }
      
        // deal with children
        if (xml.hasChildNodes()) {
          for(var i = 0; i < xml.childNodes.length; i++) {
            var child = xml.childNodes.item(i);
            var nodeName = child.nodeName;
            if (json[nodeName] == null) {
              json[nodeName] = xml2json(child);
            } else {
              if (json[nodeName].push == null) {
                var old = json[nodeName];
                json[nodeName] = [];
                json[nodeName].push(old);
              }
              json[nodeName].push(xml2json(child));
            }
          }
        }
        
        return json;
    }

    function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var attributes = item.attributes;
                for(var idx in attributes) {
                    var itemAtt = attributes[idx];
                    var dataKey = itemAtt.nodeName;
                    var dataValue = itemAtt.nodeValue;

                    if(dataKey !== undefined) {
                        obj[dataKey] = dataValue;
                    }
                }
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              console.log(e.message);
          }
    }

    EXIF.enableXmp = function() {
        EXIF.isXmpEnabled = true;
    }

    EXIF.disableXmp = function() {
        EXIF.isXmpEnabled = false;
    }

    EXIF.getData = function(img, callback) {
        if (((self.Image && img instanceof self.Image)
            || (self.HTMLImageElement && img instanceof self.HTMLImageElement))
            && !img.complete)
            return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }
    
    EXIF.getIptcTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.iptcdata[tag];
    }

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }
    
    EXIF.getAllIptcTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.iptcdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return EXIF;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
}.call(this));



/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShetuanInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_exif_js__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_exif_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__http_http_Service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_utils_HelpUtils__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ShetuanInfoPage = /** @class */ (function () {
    function ShetuanInfoPage(navCtrl, navParams, alertCtrl, http, HelpUtils, DomS, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.DomS = DomS;
        this.actionSheetCtrl = actionSheetCtrl;
        this.isActive = false;
        this.pet = "activity";
        this.SheTuanHonor = [];
        this.Activityfz = [];
        this.Activity = [];
        this.ActivityOne = {
            UnionName: '',
            membernum: '',
            activitynum: '',
            UnionInfo: '',
            RecordId: '',
            StaffCode: ''
        };
        this.ShetuanApply = {
            status: 7,
            PassInfo: '',
            ApplicationCode: ''
        };
        this.StudentInfo = {
            name: ''
        };
        this.moreData = true;
        this.moreDatae = true;
        this.moreDatar = true;
        this.gengduo = false;
        this.subStop = false;
        this.fabus = false;
        this.activitystatus = 3;
        this.page = {
            Page: 1,
            PageSize: 10,
        };
        this.pagefabu = {
            Page: 1,
            PageSize: 10,
        };
        this.honorpage = {
            lastid: 1,
            count: 10
        };
        this.deletestatus = false;
        this.CertifyImgs = [];
        this.CertifyImg = {
            AttachmentURL: ''
        };
        this.RecordIdArr = []; //存储后台返回的RecordID
        this.showmage = false;
        this.touxiang = false;
        this.honorpicture = false;
        this.ApplyMember = [];
        this.missstatus = false;
        this.Applypage = {
            Page: 1,
            PageSize: 100,
        };
        this.substatus = false;
        this.rorateAngle = 0;
        this.UnionCode = this.navParams.get('UnionCode');
        this.Member = this.navParams.get('Member');
        this.shetuanstatus = this.navParams.get('shetuanstatus');
        if (this.UnionCode && this.shetuanstatus) {
            this.sesstionCut();
        }
    }
    //初始化加载
    ShetuanInfoPage.prototype.ionViewWillEnter = function () {
        antlinker.configTitle({
            type: "label",
            title: "社团风采",
            fail: function () { },
            success: function () { }
        });
        // 右上角按钮
        antlinker.configTitleButton({
            showClose: true,
            type: "label",
            text: "",
            success: function () { },
            fail: function () { },
            trigger: function () { }
        });
    };
    //初始化加载
    ShetuanInfoPage.prototype.ionViewDidEnter = function () {
        if (!this.UnionCode) {
            this.UnionCode = sessionStorage.getItem('UnionCode');
        }
        if (!this.shetuanstatus) {
            this.shetuanstatus = sessionStorage.getItem('shetuanstatus');
        }
        if (this.shetuanstatus == 3) {
            this.ShetuanApply.status = 0;
        }
        this.getallactivityinfo(true);
        this.getallactivityfabuinfo(true);
        this.getownapplyinfo();
        this.getshetuaninfo();
        this.getunionhonorinfo();
        this.getname();
        this.getapplyinfo();
        // this.presentActionSheet();
        // alert(this.ActivityOne.UnionInfo);
    };
    //跳转图片放大
    ShetuanInfoPage.prototype.navPreview = function (params) {
        this.navCtrl.push('PreviewPhotoPage', params);
    };
    //存储缓存
    ShetuanInfoPage.prototype.sesstionCut = function () {
        sessionStorage.setItem('UnionCode', this.UnionCode);
        sessionStorage.setItem('shetuanstatus', this.shetuanstatus);
        console.log(7);
        console.log(sessionStorage.getItem('UnionCode'));
    };
    ShetuanInfoPage.prototype.subapplication = function (m) {
        this.substatus = true;
        this.tstatus = m;
    };
    ShetuanInfoPage.prototype.cancel = function () {
        this.substatus = false;
        this.shenqingapply = null;
    };
    ShetuanInfoPage.prototype.applicationsub = function () {
        if (this.shenqingapply) {
            this.ApplyInfo = this.shenqingapply;
        }
        else {
            this.ApplyInfo = this.placeholder;
        }
        this.addshetuanapply();
        this.substatus = false;
    };
    ShetuanInfoPage.prototype.showPrompt = function () {
        var prompt = this.alertCtrl.create({
            title: this.title,
            message: this.message,
            cssClass: this.cssClass,
            // inputs: [
            //   {
            //     name: 'title',
            //     placeholder: 'Title',
            //     // type: 'password'
            //   },
            // ],
            buttons: [
                {
                    text: this.applytext,
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
            ]
        });
        prompt.present();
    };
    // presentActionSheet() {
    //   let actionSheet = this.actionSheetCtrl.create({
    //     // title: 'Modify your album',
    //     cssClass:'headChoice',
    //     buttons: [
    //       {
    //         text: '查看大图',
    //         role: 'destructive',
    //         handler: () => {
    //          this.popup();
    //         }
    //       },
    //       {
    //         text: '更换头像',
    //         handler: () => {
    //           this.handleFiles(File);
    //         }
    //       },
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         handler: () => {
    //           console.log('Cancel clicked');
    //         }
    //       }
    //     ]
    //   });
    //   actionSheet.present();
    // }
    ShetuanInfoPage.prototype.change = function () {
        this.gengduo = !this.gengduo;
    };
    ShetuanInfoPage.prototype.retijiaobefore = function (m) {
        this.retijiao = 1;
        this.activitystatus = 1;
        this.ActivityCode = m.ActivityCode;
        this.UnionName = this.ActivityOne.UnionName;
        this.Name = m.Activity;
        this.Info = m.Info;
        this.Time = m.Starttime;
        this.Place = m.Place;
        this.Connect = m.Connect;
        this.phone = m.phone;
        this.num = m.peoplenum;
    };
    ShetuanInfoPage.prototype.retijiaosub = function () {
        this.navCtrl.push('ActivityPage', {
            UnionCode: this.UnionCode,
            ActivityCode: this.ActivityCode,
            activitystatus: this.activitystatus,
            shetuanstatus: this.shetuanstatus,
            retijiao: this.retijiao,
            UnionName: this.UnionName,
        });
    };
    ShetuanInfoPage.prototype.closere = function () {
        this.retijiao = null;
    };
    ShetuanInfoPage.prototype.shenqing = function () {
        this.subStop = true;
        this.UnionName = this.ActivityOne.UnionName;
        this.StaffCode = this.ActivityOne.StaffCode;
        this.navCtrl.push('ActivityPage', {
            UnionCode: this.UnionCode,
            StaffCode: this.StaffCode,
            UnionName: this.UnionName,
            shetuanstatus: this.shetuanstatus
        });
    };
    ShetuanInfoPage.prototype.fabubefore = function (m) {
        this.activitystatus = 4;
        this.ActivityCode = m.ActivityCode;
        this.Name = m.Activity;
        this.Info = m.Info;
        this.Time = m.Starttime;
        this.Place = m.Place;
        this.Connect = m.Connect;
        this.phone = m.phone;
        this.num = m.peoplenum;
        this.fabus = true;
    };
    ShetuanInfoPage.prototype.closefa = function () {
        this.fabus = false;
    };
    //活动总结
    ShetuanInfoPage.prototype.zongjie = function (m) {
        this.activitystatus = 5;
        this.ActivityCode = m.ActivityCode;
        this.navCtrl.push('ActivityEndPage', {
            ActivityCode: this.ActivityCode,
            activitystatus: this.activitystatus,
            UnionCode: this.UnionCode,
            shetuanstatus: this.shetuanstatus,
        });
    };
    ShetuanInfoPage.prototype.fabu = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.updateactivity,
            Method: 'POST',
            Body: {
                Status: this.activitystatus,
                Code: this.ActivityCode,
                Name: this.Name,
                Info: this.Info,
                Time: this.Time,
                Place: this.Place,
                Connect: this.Connect,
                Phone: this.phone,
                Num: this.num // 预计参加人数
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.HelpUtils.toastPopTop('发布成功');
                _this.navCtrl.push('ShetuanInfoPage', {
                    UnionCode: _this.UnionCode,
                    shetuanstatus: _this.shetuanstatus
                });
            }
            else {
                _this.HelpUtils.toastPopTop(res);
            }
        }, function (err) { return console.log(err); });
    };
    ShetuanInfoPage.prototype.activitychange = function () {
        this.activitystatus = 1;
        this.UnionName = this.ActivityOne.UnionName;
        this.navCtrl.push('ActivityPage', {
            UnionCode: this.UnionCode,
            ActivityCode: this.ActivityCode,
            activitystatus: this.activitystatus,
            shetuanstatus: this.shetuanstatus,
            UnionName: this.UnionName,
        });
    };
    ShetuanInfoPage.prototype.deleteactivity = function (m) {
        this.deletestatus = true;
        this.deleteactivityCode = m.ActivityCode;
    };
    ShetuanInfoPage.prototype.deletecancel = function () {
        this.deletestatus = false;
    };
    ShetuanInfoPage.prototype.deletego = function () {
        var _this = this;
        this.deletestatus = false;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.deleteactivity,
            Method: 'POST',
            Body: {
                Code: this.deleteactivityCode
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                console.log('删除成功');
                _this.getallactivityinfo(true);
                _this.getallactivityfabuinfo(true);
            }
            else {
                _this.HelpUtils.toastPopTop(res);
            }
        });
    };
    ShetuanInfoPage.prototype.subhonor = function () {
        this.subStop = true;
        this.navCtrl.push('HonorPage', {
            UnionCode: this.UnionCode,
            shetuanstatus: this.shetuanstatus,
            Member: this.Member
        });
    };
    //活动总结展示
    ShetuanInfoPage.prototype.subendpage = function () {
        this.navCtrl.push('PreviewPage', {
            UnionCode: this.UnionCode,
            shetuanstatus: this.shetuanstatus,
            Member: this.Member
        });
    };
    //成员页跳转
    ShetuanInfoPage.prototype.submemberpage = function () {
        this.UnionName = this.ActivityOne.UnionName;
        this.navCtrl.push('ShetuanMemberPage', {
            UnionCode: this.UnionCode,
            UnionName: this.UnionName,
            shetuanstatus: this.shetuanstatus,
            Member: this.Member
        });
    };
    ShetuanInfoPage.prototype.showimage = function () {
        this.showmage = !this.showmage;
    };
    ShetuanInfoPage.prototype.popup = function () {
        console.log(799);
        this.touxiang = !this.touxiang;
        this.showmage = false;
        //点击后弹出隐藏界面
    };
    ShetuanInfoPage.prototype.closesr = function () {
        this.showmage = false;
    };
    //加载社团活动
    ShetuanInfoPage.prototype.getallactivityinfo = function (reload) {
        var _this = this;
        if (reload === void 0) { reload = false; }
        if (reload) {
            this.page.Page = 1;
        }
        console.log(1);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getallactivityinfo,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page++,
                PageSize: this.page.PageSize,
                Aname: null,
                Uname: this.UnionCode,
                Code: null,
                Sbtime: null,
                Setime: null,
                Pbtime: null,
                Petime: null
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.Activity = res.Data.Datas;
                console.log(_this.Activity);
            }
        });
    };
    //加载所有已发布或者总结的社团活动
    ShetuanInfoPage.prototype.getallactivityfabuinfo = function (reload) {
        var _this = this;
        if (reload === void 0) { reload = false; }
        if (reload) {
            this.pagefabu.Page = 1;
        }
        console.log(1);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getallactivityfabuinfo,
            Method: 'POST',
            Body: {
                PageNum: this.pagefabu.Page++,
                PageSize: this.pagefabu.PageSize,
                Aname: null,
                Uname: this.UnionCode,
                Code: null,
                Sbtime: null,
                Setime: null,
                Pbtime: null,
                Petime: null
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.Activityfz = res.Data.Datas;
                console.log(_this.Activity);
            }
        });
    };
    ShetuanInfoPage.prototype.doInfinitea = function (infiniteScroll) {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getallactivityinfo,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page++,
                PageSize: this.page.PageSize,
                Aname: null,
                Uname: this.UnionCode,
                Code: null,
                Sbtime: null,
                Setime: null,
                Pbtime: null,
                Petime: null
            }
        }).then(function (res) {
            if (res.Data.Datas.length && !res.FeedbackCode) {
                _this.moreData = true;
                _this.Activity = _this.Activity.concat(res.Data.Datas);
            }
            else {
                _this.moreData = false;
            }
            infiniteScroll.complete();
        });
    };
    ShetuanInfoPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getallactivityfabuinfo,
            Method: 'POST',
            Body: {
                PageNum: this.pagefabu.Page++,
                PageSize: this.pagefabu.PageSize,
                Aname: null,
                Uname: this.UnionCode,
                Code: null,
                Sbtime: null,
                Setime: null,
                Pbtime: null,
                Petime: null
            }
        }).then(function (res) {
            if (res.Data.Datas.length && !res.FeedbackCode) {
                _this.moreDatae = true;
                _this.Activityfz = _this.Activityfz.concat(res.Data.Datas);
            }
            else {
                _this.moreDatae = false;
            }
            infiniteScroll.complete();
        });
    };
    //上拉加载社团荣誉
    ShetuanInfoPage.prototype.doInfiniter = function (infiniteScroll) {
        var _this = this;
        console.log('荣誉');
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getunionhonorinfo,
            Method: 'POST',
            Body: {
                Uname: this.UnionCode,
                pageindex: this.honorpage.lastid++,
                pagesize: this.honorpage.count
            }
        }).then(function (res) {
            if (res.Data.data && !res.FeedbackCode) {
                _this.moreDatar = true;
                _this.SheTuanHonor = _this.SheTuanHonor.concat(res.Data.data);
            }
            else {
                _this.moreDatar = false;
                console.log('荣誉wu');
            }
            infiniteScroll.complete();
        });
    };
    //加载头部社团信息
    ShetuanInfoPage.prototype.getshetuaninfo = function () {
        var _this = this;
        console.log(2);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getshetuaninfo,
            Method: 'POST',
            Body: {
                Uname: this.UnionCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.ActivityOne = res.Data;
                // alert(this.ActivityOne.UnionInfo);
                _this.CertifyImg.AttachmentURL = res.Data.AttachmentURL;
                console.log(_this.ActivityOne);
                if (_this.ShetuanApply.status == 3) {
                    _this.cssClass = 'applyalert';
                    _this.title = '恭喜你';
                    _this.applytext = '好 的';
                    _this.message = '你已经成为' + _this.ActivityOne.UnionName + '的一员,请关注社团发布的信息，积极参与社团活动，认识更多的小伙伴吧。';
                    _this.applystatus = 5;
                    _this.showPrompt();
                    _this.updateshetuanapply();
                }
            }
        });
    };
    //加载社团荣誉
    ShetuanInfoPage.prototype.getunionhonorinfo = function () {
        var _this = this;
        console.log(9);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getunionhonorinfo,
            Method: 'POST',
            Body: {
                Uname: this.UnionCode,
                pageindex: this.honorpage.lastid++,
                pagesize: this.honorpage.count
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data.data) {
                // for (let i = 0; i < res.length; i++) {
                //   res[i].Data = JSON.parse(res[i].Data);
                // }
                _this.SheTuanHonor = _this.SheTuanHonor.concat(res.Data.data);
                console.log(_this.SheTuanHonor);
                // this.gengduocheck();
            }
        });
    };
    //加载个人姓名
    ShetuanInfoPage.prototype.getname = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getname,
            Method: 'POST',
            Body: {}
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data) {
                // for (let i = 0; i < res.length; i++) {
                //   res[i].Data = JSON.parse(res[i].Data);
                // }
                _this.StudentInfo = res.Data;
                console.log('abcd' + _this.StudentInfo);
                _this.placeholder = '你好，我是' + _this.StudentInfo.name + '我想加入咱们社团';
            }
        });
    };
    //社团头像存储
    ShetuanInfoPage.prototype.updateunionavatar = function () {
        var _this = this;
        var RecordIdString = this.RecordIdArr.join(',');
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.updateunionavatar,
            Method: 'POST',
            Body: {
                Code: this.UnionCode,
                AttachmentCode: RecordIdString,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                console.log('save avatar success');
                _this.HelpUtils.toastPopTop('图片更换成功');
                _this.getshetuaninfo();
            }
            else {
                console.log('save avatar fail');
            }
        }, function (err) { return console.log(err); });
    };
    //======七牛上传
    ShetuanInfoPage.prototype.upload = function (obj) {
        this.fileLoading = this.HelpUtils.loadingPop('正在上传，请稍等...');
        var that = this;
        var observable = qiniu.upload(obj.file, obj.key, obj.token, {
            mimeType: ["image/png", "image/jpeg", "image/jpg"]
        }, {
            useCdnDomain: true
        });
        var observer = {
            next: function (res) {
                console.log(res);
                // ...
            },
            error: function (err) {
                that.HelpUtils.toastPop(err.message);
                return false;
                // ...
            },
            complete: function (res) {
                var file = obj.file;
                that.fileLoading.dismiss();
                that.http.postJSON({
                    Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.saveAttach, Method: 'POST', Body: {
                        BizType: 'StudentNeedSupport',
                        AttachmentItemName: file.name || '',
                        AttachmentItemType: file.type,
                        AttachmentItemSize: file.size.toString(),
                        AttachmentURL: res.key,
                        Base64: '',
                    }
                }).then(function (response) {
                    if (!response.FeedbackCode) {
                        that.RecordIdArr.push(response.Data.RecordID);
                        that.CertifyImg.AttachmentURL = window.URL.createObjectURL(file),
                            that.updateunionavatar();
                        that.showmage = false;
                    }
                    else {
                        that.HelpUtils.toastPop(response.FeedbackText);
                    }
                    console.log(res);
                });
            }
        };
        var subscription = observable.subscribe(observer); // 上传开始
    };
    ShetuanInfoPage.prototype.handleFiles = function (event) {
        var _this = this;
        console.log(event);
        var file = event.target.files[0];
        console.log(file.size, '11111111111');
        if (file.size > 5242880) {
            this.HelpUtils.toastPop('文件大小限制:5M');
            return;
        }
        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
            this.HelpUtils.toastPop('格式错误,请选择"png,jpeg,jpg"格式文件上传');
            return;
        }
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getUpToken,
            Method: 'POST',
            Body: {
                Name: file.name,
                Size: file.size,
                BizType: "SchoolApply"
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof });
            }
            else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
                _this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        });
    };
    /*
    社团申请
    */
    ShetuanInfoPage.prototype.addshetuanapply = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.addshetuanapply,
            Method: 'POST',
            Body: {
                Code: this.UnionCode,
                Info: this.ApplyInfo,
                Status: 1,
                Tstatus: Number(this.tstatus) //判断初回还是被拒绝
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                console.log('save apply success');
                _this.getownapplyinfo();
            }
            else {
                console.log('save apply fail');
            }
        }, function (err) { return console.log(err); });
    };
    //获取自己申请详情
    ShetuanInfoPage.prototype.getownapplyinfo = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getownapplyinfo,
            Method: 'POST',
            Body: {
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data) {
                _this.ShetuanApply = res.Data;
                if (_this.ShetuanApply.status == 2) {
                    _this.cssClass = 'passalert';
                    _this.title = '社团负责人拒绝了你的加入申请';
                    _this.applytext = '关 闭';
                    _this.message = '拒绝理由：' + _this.ShetuanApply.PassInfo;
                    _this.applystatus = 4;
                    _this.showPrompt();
                    _this.updateshetuanapply();
                }
            }
            else {
                console.log('save apply fail');
            }
        }, function (err) { return console.log(err); });
    };
    //更新社团申请最终
    ShetuanInfoPage.prototype.updateshetuanapply = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.updateshetuanapply,
            Method: 'POST',
            Body: {
                Code: this.ShetuanApply.ApplicationCode,
                Info: this.ShetuanApply.PassInfo,
                Status: this.applystatus,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                console.log('update apply success');
                _this.getownapplyinfo();
            }
            else {
                console.log('update apply fail');
            }
        }, function (err) { return console.log(err); });
    };
    //加载当前社团申请列表
    ShetuanInfoPage.prototype.getapplyinfo = function () {
        var _this = this;
        console.log(1);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_4__app_ServelUrl__["a" /* ServelUrl */].Url.getapplyinfo,
            Method: 'POST',
            Body: {
                PageNum: this.Applypage.Page,
                PageSize: this.Applypage.PageSize,
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data.Datas) {
                _this.ApplyMember = res.Data.Datas;
                _this.applymiss = _this.ApplyMember.filter(function (item) { return item.status == 1; });
                console.log('ab' + Boolean(_this.applymiss.length));
                // if (applymiss.length) {
                //   this.missstatus = true;
                // }
            }
        });
    };
    ShetuanInfoPage.prototype.getInfo = function () {
        var that = this;
        __WEBPACK_IMPORTED_MODULE_1_exif_js__["getData"](this.imgElement.nativeElement, function () {
            var imgInfo = __WEBPACK_IMPORTED_MODULE_1_exif_js__["getAllTags"](this);
            var imgRotate = __WEBPACK_IMPORTED_MODULE_1_exif_js__["getTag"](this, 'Orientation');
            console.log(imgInfo);
            switch (imgRotate) {
                // 顺时针旋转90度  
                case 0:
                    that.rorateAngle = 90;
                    break;
                // 逆时针旋转90度  
                case 8:
                    that.rorateAngle = -90;
                    break;
                case 3:
                    that.rorateAngle = 180;
                    break;
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('imgElement'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ShetuanInfoPage.prototype, "imgElement", void 0);
    ShetuanInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-shetuaninfo',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/shetuaninfo/shetuaninfo.html"*/'<ion-content class="grid-basic-page">\n    <ion-card style="margin: 2px 0;width: 100%;box-shadow:0 2px 5px 0 #E3E3E3 !important;">\n        <ion-item style="width: 90%;margin:10px auto;border-bottom: 1px solid #E3E3E3;padding: 0;">\n            <ion-avatar item-start *ngIf="!ActivityOne.RecordId" (click)="showimage()">\n                <img id="wechatBox" src="assets/images/社团默认头像.png">\n            </ion-avatar>\n            <ion-avatar item-start *ngIf="ActivityOne.RecordId" (click)="showimage()">\n                <img id="wechatBox" [src]="DomS.bypassSecurityTrustUrl(CertifyImg.AttachmentURL)">\n            </ion-avatar>\n            <div class="fn16 h2-content color4a">{{ActivityOne.UnionName}}</div>\n            <span class="fn14" style="color:#9B9B9B;position: relative;line-height: 26px;" (click)="submemberpage()">成员{{ActivityOne.membernum}}\n                <span *ngIf="applymiss && applymiss.length && shetuanstatus==1" class="redcircle"></span></span>\n            <span class="fn14" style="color:#9B9B9B;margin-left: 10px;line-height: 26px;" (click)="subendpage()">活动{{ActivityOne.activitynum}}</span>\n            <!-- <ion-thumbnail item-end>\n                            <img src="img/thumbnail-totoro.png">\n                        </ion-thumbnail> -->\n            <button ion-button item-end *ngIf="ShetuanApply.status==0 || ShetuanApply.status==4" (click)="subapplication(ShetuanApply.status)"\n                style="background: #FFC000" class="shenqingbt">申请加入</button>\n            <span item-end *ngIf="ShetuanApply.status==1" style="color: #9B9B9B; font-size: 14px;">申请加入中</span>\n        </ion-item>\n\n        <div [ngClass]="{true: \'title-content-none\', false: \'title-content\'}[gengduo]" (click)="change()" style="width: 90%;margin:10px auto;">\n            <p class="fn14" style="line-height: 18px;" id="zigengduo">\n                简介：{{ActivityOne.UnionInfo}}\n            </p>\n        </div>\n\n    </ion-card>\n\n    <div class="photoalert" *ngIf="substatus">\n        <div class="alertback"></div>\n        <div class="alertwapper">\n            <div class="alert-content">\n                <!-- <div class="surplus-num-box"> -->\n                <ion-textarea maxlength="21" max="21" class="textarea" [(ngModel)]="shenqingapply" name="Info"\n                    [placeholder]="placeholder"></ion-textarea>\n                <!-- <p class="surplus-num" *ngIf="shenqingapply.length">{{21 - shenqingapply.length}}</p> -->\n                <!-- </div> -->\n                <div class="btn-wapper-line">\n                    <button ion-button class="btn-ghost" (click)="cancel()">取消</button>\n                    <button ion-button (click)="applicationsub()">确定</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class="photoalert" *ngIf="deletestatus">\n        <div class="alertback"></div>\n        <div class="alertwapper">\n            <div class="alert-content">\n                <div class="center" style="color:green;">确认要删除该活动吗</div>\n                <div class="btn-wapper-line">\n                    <button ion-button class="btn-ghost" (click)="deletecancel()">取消</button>\n                    <button ion-button (click)="deletego()">确定</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div style="height:8px;background-color: #fafafa;"></div>\n\n    <ion-card style="margin:2px 0;width:100%;max-height: 70px;box-shadow:0 2px 5px 0 #E3E3E3 !important;">\n\n        <div padding style="max-height: 65px; padding: 5px 5px;margin: 0 10px;min-height: 45px;">\n            <ion-segment [(ngModel)]="pet">\n                <ion-segment-button value="activity">\n                    社团活动\n                </ion-segment-button>\n                <ion-segment-button value="honor">\n                    社团荣誉\n                </ion-segment-button>\n            </ion-segment>\n        </div>\n    </ion-card>\n\n\n    <div [ngSwitch]="pet">\n        <ion-list *ngSwitchCase="\'honor\'">\n            <div class="honor">\n                <div class="honortupiao center"> <img src="assets/images/rongyuqiang@2x.png"></div>\n                <div class="honorbody">\n                    <div style="height:30px;"></div>\n                    <div *ngFor=" let item of SheTuanHonor">\n                        <div style="margin-top:10px;width: 100%">\n                            <ion-item>\n                                <div class="fn16 center honor-content" style="width: 100%"><b>{{item.name}}</b></div>\n                                <div class="center " style="width: 100%;color: #9B9B9B">\n                                    <span class="fn12 ">{{item.insertdatetime.substr(0,10)}}</span>\n                                    <span class="fn12 " style="margin-left:20px;">由<span class="place-content">{{item.username}}</span>上传</span>\n                                </div>\n                            </ion-item>\n                            <ion-item class="honorphoto center">\n                                <ul *ngFor="let itam of item.attachmenturl;let index=index;">\n                                    <li>\n                                        <img #imgElement (click)="navPreview({time:false,index:index,items:item.attachmenturl})"\n                                            [src]=\'DomS.bypassSecurityTrustUrl(itam.attachmenturl)\' alt="">\n\n                                    <li>\n                                </ul>\n                            </ion-item>\n                        </div>\n                    </div>\n                    <div *ngIf="SheTuanHonor.length > 0">\n                        <ion-infinite-scroll *ngIf="moreDatar" (ionInfinite)="doInfiniter($event)">\n                            <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n                            </ion-infinite-scroll-content>\n                        </ion-infinite-scroll>\n                        <div style="text-align:center;color: #8e9093;margin-top: 5px;" *ngIf="!moreDatar">我是有底线的！</div>\n                    </div>\n                </div>\n                <!-- <div class="honor-bro">\n                    <img src="assets/images/rongyuqiang-bg2@2x.png">\n                </div> -->\n            </div>\n\n        </ion-list>\n\n        <ion-list *ngSwitchCase=" \'activity\'">\n            <div *ngIf="shetuanstatus==1" style="background-color: #fafafa !important;margin-bottom: 26px;">\n                <div *ngFor="let item of Activity ">\n                    <ion-item class="fn14" style="background-color: #fafafa !important;">\n                        <ion-avatar item-start>\n                            <img src="assets/images/morentouxiang@2x.png">\n                        </ion-avatar>\n                        <span class="fn14 color4a">{{item.name}}</span>\n                        <span class="fn14" *ngIf="item.status==1" item-end style="color: red ">待审批</span>\n                        <span class="fn14" *ngIf="item.status==3" item-end style="color: red ">待发布</span>\n                        <span class="fn14" *ngIf="item.status==2" item-end style="color: red ">审批未通过</span>\n                        <span class="fn14" *ngIf="item.status==4 || item.status==5" class="color4a" item-end>{{item.UpdateDatetime.substr(0,10)}}</span>\n                    </ion-item>\n                    <ion-card style="margin:0px 12px;">\n                        <ion-card-content>\n                            <h2 class="fn18 center color4a" style="margin-bottom:10px;"><b>{{item.Activity}}</b><span\n                                    *ngIf="item.status==4" class="fr fn14" style="color: red;" (click)="deleteactivity(item) ">删除活动</span></h2>\n                            <p class="fn14 color4a">诚邀各位成员参加<span style="color: green;"><b>{{item.UnionName}}</b></span>举办的<span\n                                    style="color: green;"><b>{{item.Activity}}</b></span></p>\n                            <p class="fn14 color4a">活动内容为：<span>{{item.Info}}</span> </p>\n                            <p class="fn14 color4a">预计举办时间：<span style="color: green;"><b>{{item.Starttime}}</b></span></p>\n                            <p class="fn14 color4a">预计举办地点：<span style="color: green;"><b>{{item.Place}}</b></span></p>\n                            <p class="fn14 color4a">详细情况请咨询：<span style="color: green;"><b>{{item.Connect}}</b></span></p>\n                            <p class="fn14 color4a">联系方式：<span style="color: green;"><b>{{item.phone}}</b></span></p>\n                            <div *ngIf="item.status==3" class="fn14 center" style="color: #4A90E2;margin-top: 10px;"\n                                (click)="fabubefore(item) ">请点击发布该消息</div>\n                            <div *ngIf="item.status==4" class="fn14 center" style="color: red;margin-top: 10px;"\n                                (click)="zongjie(item) ">活动举办后请上传相关总结材料</div>\n                            <div *ngIf="item.status==2" class="fn14 center" style="color: red;margin-top: 10px;"\n                                (click)="retijiaobefore(item) ">活动未通过请重新提交</div>\n                        </ion-card-content>\n                    </ion-card>\n                </div>\n                <ion-infinite-scroll *ngIf="moreData" (ionInfinite)="doInfinitea($event)">\n                    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n                    </ion-infinite-scroll-content>\n                </ion-infinite-scroll>\n                <div style="text-align: center;color: #8e9093;marker: 5px;" *ngIf="!moreData">我是有底线的！</div>\n\n            </div>\n            <div *ngIf="shetuanstatus==2 || shetuanstatus==3" style="background-color: #fafafa !important;margin-bottom: 26px;">\n                <div *ngFor="let item of Activityfz ">\n                    <ion-item class="fn14 " style="background-color: #fafafa !important;">\n                        <ion-avatar item-start>\n                            <img src="assets/images/morentouxiang@2x.png">\n                        </ion-avatar>\n                        <span class="fn14 color4a">{{item.name}}</span>\n                        <span *ngIf="item.status==4 || item.status==5 " class="color4a" item-end>{{item.UpdateDatetime.substr(0,10)}}</span>\n                    </ion-item>\n                    <ion-card style="margin:0px 12px;">\n                        <ion-card-content>\n                            <h2 class="fn18 center color4a" style="margin-bottom:10px;"><b>{{item.Activity}}</b></h2>\n                            <p class="fn14 color4a">诚邀各位成员参加<span style="color: green;"><b>{{item.UnionName}}</b></span>举办的<span\n                                    style="color: green;"><b>{{item.Activity}}</b></span></p>\n                            <p class="fn14 color4a">活动内容为：<span>{{item.Info}}</span> </p>\n                            <p class="fn14 color4a">预计举办时间：<span style="color: green;"><b>{{item.Starttime}}</b></span></p>\n                            <p class="fn14 color4a">预计举办地点：<span style="color: green;"><b>{{item.Place}}</b></span></p>\n                            <p class="fn14 color4a">详细情况请咨询：<span style="color: green;"><b>{{item.Connect}}</b></span></p>\n                            <p class="fn14 color4a">联系方式：<span style="color: green;"><b>{{item.phone}}</b></span></p>\n                        </ion-card-content>\n                    </ion-card>\n                </div>\n                <ion-infinite-scroll *ngIf="moreDatae" (ionInfinite)="doInfinite($event)">\n                    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n                    </ion-infinite-scroll-content>\n                </ion-infinite-scroll>\n                <div style="text-align: center;color: #8e9093;margin-top: 5px;" *ngIf="!moreDatae">我是有底线的！</div>\n            </div>\n\n        </ion-list>\n    </div>\n</ion-content>\n\n<ion-footer>\n\n    <ion-toolbar [ngSwitch]="pet" *ngIf="shetuanstatus==1" style="padding: 0 0 !important;height: 35px !important;">\n        <button *ngSwitchCase=" \'activity\'" class="submit-tab mr fn16 " (click)="shenqing()">活动申请</button>\n        <button *ngSwitchCase=" \'honor\'" class="submit-tab mr fn16 " (click)="subhonor()">上传荣誉</button>\n    </ion-toolbar>\n\n</ion-footer>\n\n<div *ngIf="touxiang" id="myModal" class="modal" (click)="popup()">\n</div>\n<div *ngIf="honorpicture" id="myModal" class="modal">\n</div>\n<img *ngIf="touxiang && !ActivityOne.RecordId" id="modalimg" class="modal-content" src="assets/images/社团默认头像.png"\n    (click)="popup()">\n<img *ngIf="touxiang && ActivityOne.RecordId" id="modalimg" class="modal-content" [src]="DomS.bypassSecurityTrustUrl(CertifyImg.AttachmentURL)"\n    (click)="popup()">\n<img *ngIf="honorpicture" id="modalimg" class="modalhonor-content" [src]="DomS.bypassSecurityTrustUrl(honorsrc)"\n    (click)="popupa()">\n\n<div *ngIf="showmage" class="backdrop" (click)="closesr()"></div>\n<div *ngIf="retijiao" class="backdrop" (click)="closere()"></div>\n<div *ngIf="fabus" class="backdrop" (click)="closefa()"></div>\n\n<div class="fixed tan-alert" *ngIf="showmage">\n    <div style="border-bottom: 0.8px solid #ddd;border-top: 0.5px solid #ddd;background: #fff;height: 35px !important;">\n        <span style="display: block;text-align: center;" class="touxiangalert" (click)="popup()">查看大图</span>\n    </div>\n    <div *ngIf="shetuanstatus==1" style="padding: 0 0 !important;height: 35px !important;background: #fff;position: relative;">\n        <input type="file" value="file" class="hiddenFile" (change)="handleFiles($event)">\n        <span style="display: block;text-align: center; " class="touxiangalert">更换头像</span>\n    </div>\n\n</div>\n<div class="fixed tan-alert" *ngIf="fabus && activitystatus==4">\n    <div style="border-bottom: 0.8px solid #ddd;border-top: 0.5px solid #ddd;background: #fff;min-height: 35px !important;">\n        <!-- <div class="bar bar-footer bar-balanced "> -->\n        <span style="display: block;text-align: center; " class="fabualert" (click)="fabu() ">发布活动</span>\n        <!-- </div> -->\n    </div>\n    <div style="padding: 0 0 !important;min-height: 35px !important;background: #fff">\n        <!-- <div class="bar bar-footer bar-balanced "> -->\n        <span style="display: block;text-align: center; " class="touxiangalert" (click)="activitychange() ">活动信息修改</span>\n        <!-- </div> -->\n    </div>\n</div>\n<div class="fixed tan-alert" *ngIf="retijiao">\n    <div style="border-bottom: 0.5px solid #ddd;border-top: 0.5px solid #ddd;background: #fff;min-height: 45px !important;">\n        <span style="display: block;text-align: center; " class="tijiaoalert" (click)="retijiaosub()">重新提交</span>\n    </div>\n</div>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/shetuaninfo/shetuaninfo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_5__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_6__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ActionSheetController"]])
    ], ShetuanInfoPage);
    return ShetuanInfoPage;
}());

//# sourceMappingURL=shetuaninfo.js.map

/***/ })

});
//# sourceMappingURL=1.js.map