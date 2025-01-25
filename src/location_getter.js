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
exports.loadGoogleApiKey = loadGoogleApiKey;
exports.getLocation = getLocation;
exports.getCityFromCoordinates = getCityFromCoordinates;
exports.test = test;
var dotenv = require("dotenv");
var axios_1 = require("axios");
var path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(__dirname, '../.env') });
function loadGoogleApiKey() {
    var apiKey = process.env.SECRET_KEY;
    if (!apiKey) {
        throw new Error("API key is missing. Check your .env file.");
    }
    return apiKey;
}
function getLocation() {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, url, response, _a, lat, lng, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    apiKey = loadGoogleApiKey();
                    url = "https://www.googleapis.com/geolocation/v1/geolocate?key=".concat(apiKey);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(url, {})];
                case 2:
                    response = _b.sent();
                    if (!response.data || !response.data.location) {
                        throw new Error("Failed to retrieve location from the API.");
                    }
                    _a = response.data.location, lat = _a.lat, lng = _a.lng;
                    console.log("Location found:", { lat: lat, lng: lng });
                    return [2 /*return*/, { lat: lat, lng: lng }];
                case 3:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error) {
                        console.error("Error fetching location:", error_1.message);
                    }
                    else {
                        console.error("Unexpected error:", error_1);
                    }
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getCityFromCoordinates(lat, lng) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, url, response, results, addressComponents, _i, addressComponents_1, component, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = loadGoogleApiKey();
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
                    throw new Error("City not found.");
                case 3:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error) {
                        console.error("Error fetching city from coordinates:", error_2.message);
                    }
                    else {
                        console.error("Unexpected error:", error_2);
                    }
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var location_1, city, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getLocation()];
                case 1:
                    location_1 = _a.sent();
                    return [4 /*yield*/, getCityFromCoordinates(location_1.lat, location_1.lng)];
                case 2:
                    city = _a.sent();
                    console.log("Your current location is: Latitude ".concat(location_1.lat, ", Longitude ").concat(location_1.lng));
                    console.log("City: ".concat(city));
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    if (error_3 instanceof Error) {
                        console.error("Error:", error_3.message);
                    }
                    else {
                        console.error("Unexpected error:", error_3);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, location, city;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = loadGoogleApiKey();
                    return [4 /*yield*/, getLocation(apiKey)];
                case 1:
                    location = _a.sent();
                    return [4 /*yield*/, getCityFromCoordinates(location.lat, location.lng, apiKey)];
                case 2:
                    city = _a.sent();
                    console.log("Test - Coordinates: Latitude ".concat(location.lat, ", Longitude ").concat(location.lng));
                    console.log("Test - City: ".concat(city));
                    return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    main();
}
