"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var dotenv = require("dotenv");
dotenv.config();
var apiKey = process.env.SECRET_KEY;
// Get the location of the person => gives lat/long
function getGeolocation() {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://www.googleapis.com/geolocation/v1/geolocate?key=".concat(apiKey);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(url, {
                            considerIp: true, // Optional, it will use IP-based geolocation
                        })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.data.location]; // Return the geolocation (lat, lng)
                case 3:
                    error_1 = _a.sent();
                    console.error("Error in geolocation:", error_1.message);
                    return [2 /*return*/, null]; // Return null if there is an error
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Get the city from coordinates
function getCityFromCoordinates(lat, lng) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, results, addressComponents, _i, addressComponents_1, component, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=".concat(lat, ",").concat(lng, "&key=").concat(apiKey);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 2:
                    response = _a.sent();
                    results = response.data.results;
                    if (results.length > 0) {
                        addressComponents = results[0].address_components;
                        for (_i = 0, addressComponents_1 = addressComponents; _i < addressComponents_1.length; _i++) {
                            component = addressComponents_1[_i];
                            if (component.types.includes("locality")) {
                                return [2 /*return*/, component.long_name];
                            }
                        }
                    }
                    return [2 /*return*/, "City not found"];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error in reverse geocoding:", error_2.message);
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//helps you test this out
function getLocationAndCity() {
    return __awaiter(this, void 0, void 0, function () {
        var location, lat, lng, city;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGeolocation()];
                case 1:
                    location = _a.sent();
                    if (!location) return [3 /*break*/, 3];
                    lat = location.lat, lng = location.lng;
                    console.log("Geolocation retrieved: Latitude - ".concat(lat, ", Longitude - ").concat(lng));
                    return [4 /*yield*/, getCityFromCoordinates(lat, lng)];
                case 2:
                    city = _a.sent();
                    console.log("City:", city);
                    return [3 /*break*/, 4];
                case 3:
                    console.log("Unable to retrieve location.");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
getLocationAndCity();
