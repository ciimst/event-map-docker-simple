!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("leaflet")) : 
    "function" == typeof define && define.amd ? define(["exports", "leaflet"], e) : 
    e(((t = t || self).GeoSearch = {}), t.L);
})(this, function (t, e) {
    function r() {
        return (r =
            Object.assign ||
            function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var r = arguments[e];
                    for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
            }).apply(this, arguments);
    }
    function n(t, e) {
        (t.prototype = Object.create(e.prototype)), (t.prototype.constructor = t), (t.__proto__ = e);
    }
    function o(t, e) {
        return (o =
            Object.setPrototypeOf ||
            function (t, e) {
                return (t.__proto__ = e), t;
            })(t, e);
    }
    function s() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
        } catch (t) {
            return !1;
        }
    }
    function i(t, e, r) {
        return (i = s()
            ? Reflect.construct
            : function (t, e, r) {
                  var n = [null];
                  n.push.apply(n, e);
                  var s = new (Function.bind.apply(t, n))();
                  return r && o(s, r.prototype), s;
              }).apply(null, arguments);
    }
    function a(t, e, r, n) {
        void 0 === e && (e = ""), void 0 === n && (n = {});
        var o = document.createElement(t);
        return (
            e && (o.className = e),
            Object.keys(n).forEach(function (t) {
                if ("function" == typeof n[t]) {
                    var e = 0 === t.indexOf("on") ? t.substr(2).toLowerCase() : t;
                    o.addEventListener(e, n[t]);
                } else "html" === t ? (o.innerHTML = n[t]) : "text" === t ? (o.innerText = n[t]) : o.setAttribute(t, n[t]);
            }),
            r && r.appendChild(o),
            o
        );
    }
    function u(t) {
        t.preventDefault(), t.stopPropagation();
    }
    var l = function () {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
        return e.filter(Boolean).join(" ").trim();
    };
    function c(t, e) {
        t &&
            t.classList &&
            (Array.isArray(e) ? e : [e]).forEach(function (e) {
                t.classList.contains(e) || t.classList.add(e);
            });
    }
    function h(t, e) {
        t &&
            t.classList &&
            (Array.isArray(e) ? e : [e]).forEach(function (e) {
                t.classList.contains(e) && t.classList.remove(e);
            });
    }
    var p,
        d = 13,
        f = 40,
        m = 38,
        v = [d, 27, f, m, 37, 39],
        y = (function () {
            function t(t) {
                var e = this,
                    r = t.handleSubmit,
                    n = t.searchLabel,
                    o = t.classNames,
                    s = void 0 === o ? {} : o;
                (this.hasError = !1),
                    (this.container = a("div", l("geosearch", s.container))),
                    (this.form = a("form", ["", s.form].join(" "), this.container, { autocomplete: "none", onClick: u, onDblClick: u, touchStart: u, touchEnd: u })),
                    (this.input = a("input", ["glass", s.input].join(" "), this.form, {
                        type: "text",
                        placeholder: n || "search",
                        onInput: this.onInput,
                        onKeyUp: function (t) {
                            return e.onKeyUp(t);
                        },
                        onKeyPress: function (t) {
                            return e.onKeyPress(t);
                        },
                        onFocus: this.onFocus,
                        onBlur: this.onBlur,
                        onClick: function () {
                            e.input.focus(), e.input.dispatchEvent(new Event("focus"));
                        },
                    })),
                    (this.handleSubmit = r);
            }
            var e = t.prototype;
            return (
                (e.onFocus = function () {
                    c(this.form, "active");
                }),
                (e.onBlur = function () {
                    h(this.form, "active");
                }),
                (e.onSubmit = function (t) {
                    try {
                        var e = this;
                        return (
                            u(t),
                            h((r = e.container), "error"),
                            c(r, "pending"),
                            Promise.resolve(e.handleSubmit({ query: e.input.value })).then(function () {
                                h(e.container, "pending");
                            })
                        );
                    } catch (t) {
                        return Promise.reject(t);
                    }
                    var r;
                }),
                (e.onInput = function () {
                    this.hasError && (h(this.container, "error"), (this.hasError = !1));
                }),
                (e.onKeyUp = function (t) {
                    27 === t.keyCode && (h(this.container, ["pending", "active"]), (this.input.value = ""), document.body.focus(), document.body.blur());
                }),
                (e.onKeyPress = function (t) {
                    t.keyCode === d && this.onSubmit(t);
                }),
                (e.setQuery = function (t) {
                    this.input.value = t;
                }),
                t
            );
        })(),
        g = (function () {
            function t(t) {
                var e = this,
                    r = t.handleClick,
                    n = t.classNames,
                    o = void 0 === n ? {} : n,
                    s = t.notFoundMessage;
                (this.selected = -1),
                    (this.results = []),
                    (this.onClick = function (t) {
                        if ("function" == typeof e.handleClick) {
                            var r = t.target;
                            if (r && e.container.contains(r) && r.hasAttribute("data-key")) {
                                var n = Number(r.getAttribute("data-key"));
                                e.clear(), e.handleClick({ result: e.results[n] });
                            }
                        }
                    }),
                    (this.handleClick = r),
                    (this.notFoundMessage = s ? a("div", l(o.notfound), void 0, { html: s }) : void 0),
                    (this.container = a("div", l("results", o.resultlist))),
                    this.container.addEventListener("click", this.onClick, !0),
                    (this.resultItem = a("div", l(o.item)));
            }
            var e = t.prototype;
            return (
                (e.render = function (t, e) {
                    var r = this;
                    void 0 === t && (t = []),
                        this.clear(),
                        t.forEach(function (t, n) {
                            var o = r.resultItem.cloneNode(!0);
                            o.setAttribute("data-key", "" + n), (o.innerHTML = e({ result: t })), r.container.appendChild(o);
                        }),
                        t.length > 0 ? (c(this.container.parentElement, "open"), c(this.container, "active")) : this.notFoundMessage && (this.container.appendChild(this.notFoundMessage), c(this.container.parentElement, "open")),
                        (this.results = t);
                }),
                (e.select = function (t) {
                    return (
                        Array.from(this.container.children).forEach(function (e, r) {
                            return r === t ? c(e, "active") : h(e, "active");
                        }),
                        (this.selected = t),
                        this.results[t]
                    );
                }),
                (e.count = function () {
                    return this.results ? this.results.length : 0;
                }),
                (e.clear = function () {
                    for (this.selected = -1; this.container.lastChild; ) this.container.removeChild(this.container.lastChild);
                    h(this.container.parentElement, "open"), h(this.container, "active");
                }),
                t
            );
        })(),
        b = {
            position: "topleft",
            style: "button",
            showMarker: !0,
            showPopup: !1,
            popupFormat: function (t) {
                return "" + t.result.label;
            },
            resultFormat: function (t) {
                return "" + t.result.label;
            },
            marker: { icon: e && e.Icon ? new e.Icon.Default() : void 0, draggable: !1 },
            maxMarkers: 1,
            maxSuggestions: 5,
            retainZoomLevel: !1,
            animateZoom: !0,
            searchLabel: "Enter address",
            notFoundMessage: "",
            messageHideDelay: 3e3,
            zoomLevel: 18,
            classNames: {
                container: "leaflet-bar leaflet-control leaflet-control-geosearch",
                button: "leaflet-bar-part leaflet-bar-part-single",
                resetButton: "reset",
                msgbox: "leaflet-bar message",
                form: "",
                input: "",
                resultlist: "",
                item: "",
                notfound: "leaflet-bar-notfound",
            },
            autoComplete: !0,
            autoCompleteDelay: 250,
            autoClose: !1,
            keepResult: !1,
            updateMap: !0,
        },
        x = "Leaflet must be loaded before instantiating the GeoSearch control",
        E = {
            options: r({}, b),
            classNames: r({}, b.classNames),
            initialize: function (t) {
                var n,
                    o,
                    s,
                    i,
                    u = this;
                if (!e) throw new Error(x);
                if (!t.provider) throw new Error("Provider is missing from options");
                (this.options = r({}, this.options, {}, t)),
                    (this.classNames = r({}, this.classNames, {}, t.classNames)),
                    (this.markers = new e.FeatureGroup()),
                    (this.classNames.container += " leaflet-geosearch-" + this.options.style),
                    (this.searchElement = new y({
                        searchLabel: this.options.searchLabel,
                        classNames: { container: this.classNames.container, form: this.classNames.form, input: this.classNames.input },
                        handleSubmit: function (t) {
                            return u.onSubmit(t);
                        },
                    })),
                    (this.button = a("a", this.classNames.button, this.searchElement.container, {
                        title: this.options.searchLabel,
                        href: "#",
                        onClick: function (t) {
                            return u.onClick(t);
                        },
                    })),
                    e.DomEvent.disableClickPropagation(this.button),
                    (this.resetButton = a("a", this.classNames.resetButton, this.searchElement.form, {
                        text: "×",
                        href: "#",
                        onClick: function () {
                            return u.clearResults(null, !0);
                        },
                    })),
                    e.DomEvent.disableClickPropagation(this.resetButton),
                    this.options.autoComplete &&
                        ((this.resultList = new g({
                            handleClick: function (t) {
                                var e = t.result;
                                (u.searchElement.input.value = e.label), u.onSubmit({ query: e.label, data: e });
                            },
                            classNames: { resultlist: this.classNames.resultlist, item: this.classNames.item, notfound: this.classNames.notfound },
                            notFoundMessage: this.options.notFoundMessage,
                        })),
                        this.searchElement.form.appendChild(this.resultList.container),
                        this.searchElement.input.addEventListener(
                            "keyup",
                            ((n = function (t) {
                                return u.autoSearch(t);
                            }),
                            void 0 === (o = this.options.autoCompleteDelay) && (o = 250),
                            void 0 === s && (s = !1),
                            function () {
                                for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                                i && clearTimeout(i),
                                    (i = setTimeout(function () {
                                        (i = null), s || n.apply(void 0, e);
                                    }, o)),
                                    s && !i && n.apply(void 0, e);
                            }),
                            !0
                        ),
                        this.searchElement.input.addEventListener(
                            "keydown",
                            function (t) {
                                return u.selectResult(t);
                            },
                            !0
                        ),
                        this.searchElement.input.addEventListener(
                            "keydown",
                            function (t) {
                                return u.clearResults(t, !0);
                            },
                            !0
                        )),
                    this.searchElement.form.addEventListener(
                        "click",
                        function (t) {
                            t.preventDefault();
                        },
                        !1
                    );
            },
            onAdd: function (t) {
                var r = this.options,
                    n = r.showMarker,
                    o = r.style;
                if (((this.map = t), n && this.markers.addTo(t), "bar" === o)) {
                    var s = t.getContainer().querySelector(".leaflet-control-container");
                    (this.container = a("div", "leaflet-control-geosearch leaflet-geosearch-bar")), this.container.appendChild(this.searchElement.form), s.appendChild(this.container);
                }
                return e.DomEvent.disableClickPropagation(this.searchElement.form), this.searchElement.container;
            },
            onRemove: function () {
                var t;
                return null == (t = this.container) || t.remove(), this;
            },
            onClick: function (t) {
                t.preventDefault(), t.stopPropagation();
                var e = this.searchElement,
                    r = e.container,
                    n = e.input;
                r.classList.contains("active") ? (h(r, "active"), this.clearResults()) : (c(r, "active"), n.focus());
            },
            selectResult: function (t) {
                if (-1 !== [d, f, m].indexOf(t.keyCode))
                    if ((t.preventDefault(), t.keyCode !== d)) {
                        var e = this.resultList.count() - 1;
                        if (!(e < 0)) {
                            var r = this.resultList.selected,
                                n = t.keyCode === f ? r + 1 : r - 1,
                                o = this.resultList.select(n < 0 ? e : n > e ? 0 : n);
                            this.searchElement.input.value = o.label;
                        }
                    } else {
                        var s = this.resultList.select(this.resultList.selected);
                        this.onSubmit({ query: this.searchElement.input.value, data: s });
                    }
            },
            clearResults: function (t, e) {
                if ((void 0 === e && (e = !1), !t || 27 === t.keyCode)) {
                    var r = this.options,
                        n = r.autoComplete;
                    (!e && r.keepResult) || ((this.searchElement.input.value = ""), this.markers.clearLayers()), n && this.resultList.clear();
                }
            },
            autoSearch: function (t) {
                try {
                    var e = this;
                    if (v.indexOf(t.keyCode) > -1) return Promise.resolve();
                    var r = t.target.value,
                        n = e.options.provider,
                        o = (function () {
                            if (r.length)
                                return Promise.resolve(n.search({ query: r })).then(function (t) {
                                    (t = t.slice(0, e.options.maxSuggestions)), e.resultList.render(t, e.options.resultFormat);
                                });
                            e.resultList.clear();
                        })();
                    return Promise.resolve(o && o.then ? o.then(function () {}) : void 0);
                } catch (t) {
                    return Promise.reject(t);
                }
            },
            onSubmit: function (t) {
                try {
					var regex = new RegExp("MGRS", "i");
//					39.9958, 32.7525 t.query.includes("MGRS")
//					MGRS: 36S VK 78878 27326
					if (regex.test(t.query)){
						var a = t.query.split(":");
						var latlong = Page.MgrsToLatLong(a[1]);
						if (latlong[0]){
							var lat = latlong[1];
							var long = latlong[2];
							var query = lat.toString() + "," + long.toString()
							t.query = query;
						}
					}
                    var e = this;
                    return Promise.resolve(e.options.provider.search(t)).then(function (r) {
                        r && r.length > 0 && e.showResult(r[0], t);
                    });
                } catch (t) {
                    return Promise.reject(t);
                }
            },
            showResult: function (t, e) {
                var r = this.options,
                    n = r.autoClose,
                    o = r.updateMap,
                    s = this.markers.getLayers();
                s.length >= this.options.maxMarkers && this.markers.removeLayer(s[0]);
                var i = this.addMarker(t, e);
                o && this.centerMap(t), this.map.fireEvent("geosearch/showlocation", { location: t, marker: i }), n && this.closeResults();
            },
            closeResults: function () {
                var t = this.searchElement.container;
                t.classList.contains("active") && h(t, "active"), this.clearResults();
            },
            addMarker: function (t, r) {
                var n = this,
                    o = this.options,
                    s = o.marker,
                    i = o.showPopup,
                    a = o.popupFormat,
                    u = new e.Marker([t.y, t.x], s),
                    l = t.label;
                return (
                    "function" == typeof a && (l = a({ query: r, result: t })),
                    u.bindPopup(l),
                    this.markers.addLayer(u),
                    i && u.openPopup(),
                    s.draggable &&
                        u.on("dragend", function (t) {
                            n.map.fireEvent("geosearch/marker/dragend", { location: u.getLatLng(), event: t });
                        }),
                    u
                );
            },
            centerMap: function (t) {
                var r = this.options,
                    n = r.retainZoomLevel,
                    o = r.animateZoom,
                    s = t.bounds ? new e.LatLngBounds(t.bounds) : new e.LatLng(t.y, t.x).toBounds(10),
                    i = s.isValid() ? s : this.markers.getBounds();
                (!n && s.isValid() && !t.bounds) || n || !s.isValid() ? this.map.setView(i.getCenter(), this.getZoom(), { animate: o }) : this.map.fitBounds(i, { animate: o });
            },
            getZoom: function () {
                var t = this.options,
                    e = t.zoomLevel;
                return t.retainZoomLevel ? this.map.getZoom() : e;
            },
        };
    function L() {
        if (!e) throw new Error(x);
        for (var t = e.Control.extend(E), r = arguments.length, n = new Array(r), o = 0; o < r; o++) n[o] = arguments[o];
        return i(t, n);
    }
    !(function (t) {
        (t[(t.SEARCH = 0)] = "SEARCH"), (t[(t.REVERSE = 1)] = "REVERSE");
    })(p || (p = {}));
    var w = (function () {
            function t(t) {
                void 0 === t && (t = {}), (this.options = t);
            }
            var e = t.prototype;
            return (
                (e.getParamString = function (t) {
                    void 0 === t && (t = {});
                    var e = r({}, this.options.params, {}, t);
                    return Object.keys(e)
                        .map(function (t) {
                            return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
                        })
                        .join("&");
                }),
                (e.getUrl = function (t, e) {
                    return t + "?" + this.getParamString(e);
                }),
                (e.search = function (t) {
                    try {
                        var e = this,
                            r = e.endpoint({ query: t.query, type: p.SEARCH });
                        return Promise.resolve(fetch(r)).then(function (t) {
                            return Promise.resolve(t.json()).then(function (t) {
                                return e.parse({ data: t });
                            });
                        });
                    } catch (t) {
                        return Promise.reject(t);
                    }
                }),
                t
            );
        })(),
        k = (function (t) {
            function e() {
                return t.apply(this, arguments) || this;
            }
            n(e, t);
            var o = e.prototype;
            return (
                (o.endpoint = function () {
                    return "https://places-dsn.algolia.net/1/places/query";
                }),
                (o.findBestMatchLevelIndex = function (t) {
                    var e =
                        t.find(function (t) {
                            return "full" === t.matchLevel;
                        }) ||
                        t.find(function (t) {
                            return "partial" === t.matchLevel;
                        });
                    return e ? t.indexOf(e) : 0;
                }),
                (o.getLabel = function (t) {
                    var e, r, n, o;
                    return [
                        null == (e = t.locale_names) ? void 0 : e.default[this.findBestMatchLevelIndex(t._highlightResult.locale_names.default)],
                        null == (r = t.city) ? void 0 : r.default[this.findBestMatchLevelIndex(t._highlightResult.city.default)],
                        t.administrative[this.findBestMatchLevelIndex(t._highlightResult.administrative)],
                        null == (n = t.postcode) ? void 0 : n[this.findBestMatchLevelIndex(t._highlightResult.postcode)],
                        null == (o = t.country) ? void 0 : o.default,
                    ]
                        .filter(Boolean)
                        .join(", ");
                }),
                (o.parse = function (t) {
                    var e = this;
                    return t.data.hits.map(function (t) {
                        return { x: t._geoloc.lng, y: t._geoloc.lat, label: e.getLabel(t), bounds: null, raw: t };
                    });
                }),
                (o.search = function (t) {
                    var e = t.query;
                    try {
                        var n = this,
                            o = "string" == typeof e ? { query: e } : e;
                        return Promise.resolve(fetch(n.endpoint(), { method: "POST", body: JSON.stringify(r({}, n.options.params, {}, o)) })).then(function (t) {
                            return Promise.resolve(t.json()).then(function (t) {
                                return n.parse({ data: t });
                            });
                        });
                    } catch (t) {
                        return Promise.reject(t);
                    }
                }),
                e
            );
        })(w),
        C = (function (t) {
            function e() {
                var e;
                return ((e = t.apply(this, arguments) || this).searchUrl = "https://dev.virtualearth.net/REST/v1/Locations"), e;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    var e = t.query,
                        r = "string" == typeof e ? { q: e } : e;
                    return (r.jsonp = t.jsonp), this.getUrl(this.searchUrl, r);
                }),
                (r.parse = function (t) {
                    return 0 === t.data.resourceSets.length
                        ? []
                        : t.data.resourceSets[0].resources.map(function (t) {
                              return {
                                  x: t.point.coordinates[1],
                                  y: t.point.coordinates[0],
                                  label: t.address.formattedAddress,
                                  bounds: [
                                      [t.bbox[0], t.bbox[1]],
                                      [t.bbox[2], t.bbox[3]],
                                  ],
                                  raw: t,
                              };
                          });
                }),
                (r.search = function (t) {
                    var e,
                        r,
                        n,
                        o = t.query;
                    try {
                        var s = this,
                            i = "BING_JSONP_CB_" + Date.now();
                        return Promise.resolve(
                            ((e = s.endpoint({ query: o, jsonp: i })),
                            (r = i),
                            (n = a("script", null, document.body)),
                            n.setAttribute("type", "text/javascript"),
                            new Promise(function (t) {
                                (window[r] = function (e) {
                                    n.remove(), delete window[r], t(e);
                                }),
                                    n.setAttribute("src", e);
                            }))
                        ).then(function (t) {
                            return s.parse({ data: t });
                        });
                    } catch (t) {
                        return Promise.reject(t);
                    }
                }),
                e
            );
        })(w),
        P = (function (t) {
            function e() {
                var e;
                return ((e = t.apply(this, arguments) || this).searchUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find"), e;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    var e = t.query,
                        r = "string" == typeof e ? { text: e } : e;
                    return (r.f = "json"), this.getUrl(this.searchUrl, r);
                }),
                (r.parse = function (t) {
                    return t.data.locations.map(function (t) {
                        return {
                            x: t.feature.geometry.x,
                            y: t.feature.geometry.y,
                            label: t.name,
                            bounds: [
                                [t.extent.ymin, t.extent.xmin],
                                [t.extent.ymax, t.extent.xmax],
                            ],
                            raw: t,
                        };
                    });
                }),
                e
            );
        })(w),
        U = (function (t) {
            function e(e) {
                var r;
                return void 0 === e && (e = {}), ((r = t.call(this, e) || this).host = e.host || "http://localhost:4000"), r;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    var e = t.query;
                    switch (t.type) {
                        case p.REVERSE:
                            return this.getUrl(this.host + "/v1/reverse", "string" == typeof e ? {} : e);
                        default:
                            return this.getUrl(this.host + "/v1/autocomplete", "string" == typeof e ? { text: e } : e);
                    }
                }),
                (r.parse = function (t) {
                    return t.data.features.map(function (t) {
                        var e = { x: t.geometry.coordinates[0], y: t.geometry.coordinates[1], label: t.properties.label, bounds: null, raw: t };
                        return (
                            Array.isArray(t.bbox) &&
                                4 === t.bbox.length &&
                                (e.bounds = [
                                    [t.bbox[1], t.bbox[0]],
                                    [t.bbox[3], t.bbox[2]],
                                ]),
                            e
                        );
                    });
                }),
                e
            );
        })(w),
        S = (function (t) {
            function e(e) {
                return void 0 === e && (e = {}), (e.host = "https://api.geocode.earth"), t.call(this, e) || this;
            }
            return n(e, t), e;
        })(U),
        R = (function (t) {
            function e() {
                var e;
                return ((e = t.apply(this, arguments) || this).searchUrl = "https://maps.googleapis.com/maps/api/geocode/json"), e;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    var e = t.query;
                    return this.getUrl(this.searchUrl, "string" == typeof e ? { address: e } : e);
                }),
                (r.parse = function (t) {
                    return t.data.results.map(function (t) {
                        return {
                            x: t.geometry.location.lng,
                            y: t.geometry.location.lat,
                            label: t.formatted_address,
                            bounds: [
                                [t.geometry.viewport.southwest.lat, t.geometry.viewport.southwest.lng],
                                [t.geometry.viewport.northeast.lat, t.geometry.viewport.northeast.lng],
                            ],
                            raw: t,
                        };
                    });
                }),
                e
            );
        })(w),
        j = (function (t) {
            function e() {
                var e;
                return ((e = t.apply(this, arguments) || this).searchUrl = "https://geocode.search.hereapi.com/v1/geocode"), e;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    var e = t.query;
                    return this.getUrl(this.searchUrl, "string" == typeof e ? { q: e } : e);
                }),
                (r.parse = function (t) {
                    return t.data.items.map(function (t) {
                        return { x: t.position.lng, y: t.position.lat, label: t.address.label, bounds: null, raw: t };
                    });
                }),
                e
            );
        })(w),
        q = (function (t) {
            function e(e) {
                var r;
                void 0 === e && (e = {});
                var n = "https://nominatim.openstreetmap.org";
                return ((r = t.call(this, e) || this).searchUrl = e.searchUrl || n + "/search"), (r.reverseUrl = e.reverseUrl || n + "/reverse"), r;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    var e = t.query,
                        r = t.type,
                        n = "string" == typeof e ? { q: e } : e;
                    switch (((n.format = "json"), r)) {
                        case p.REVERSE:
                            return this.getUrl(this.reverseUrl, n);
                        default:
                            return this.getUrl(this.searchUrl, n);
                    }
                }),
                (r.parse = function (t) {
                    return (Array.isArray(t.data) ? t.data : [t.data]).map(function (t) {
                        return {
                            x: Number(t.lon),
                            y: Number(t.lat),
                            label: t.display_name,
                            bounds: [
                                [parseFloat(t.boundingbox[0]), parseFloat(t.boundingbox[2])],
                                [parseFloat(t.boundingbox[1]), parseFloat(t.boundingbox[3])],
                            ],
                            raw: t,
                        };
                    });
                }),
                e
            );
        })(w),
        N = (function (t) {
            function e(e) {
                return t.call(this, r({}, e, { searchUrl: "https://locationiq.org/v1/search.php", reverseUrl: "https://locationiq.org/v1/reverse.php" })) || this;
            }
            return n(e, t), e;
        })(q),
        A = (function (t) {
            function e() {
                var e;
                return ((e = t.apply(this, arguments) || this).searchUrl = "https://api.opencagedata.com/geocode/v1/json"), e;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    var e = t.query,
                        r = "string" == typeof e ? { q: e } : e;
                    return (r.format = "json"), this.getUrl(this.searchUrl, r);
                }),
                (r.parse = function (t) {
                    return t.data.results.map(function (t) {
                        return {
                            x: t.geometry.lng,
                            y: t.geometry.lat,
                            label: t.formatted,
                            bounds: [
                                [t.bounds.southwest.lat, t.bounds.southwest.lng],
                                [t.bounds.northeast.lat, t.bounds.northeast.lng],
                            ],
                            raw: t,
                        };
                    });
                }),
                (r.search = function (e) {
                    try {
                        return Promise.resolve(e.query.length < 2 ? [] : t.prototype.search.call(this, e));
                    } catch (t) {
                        return Promise.reject(t);
                    }
                }),
                e
            );
        })(w),
        M = (function (t) {
            function e(e) {
                var r;
                return void 0 === e && (e = {}), ((r = t.call(this, e) || this).searchUrl = e.searchUrl || "https://a.tiles.mapbox.com/v4/geocode/mapbox.places/"), r;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    return this.getUrl("" + this.searchUrl + t.query + ".json");
                }),
                (r.parse = function (t) {
                    return (Array.isArray(t.data.features) ? t.data.features : []).map(function (t) {
                        var e = null;
                        return (
                            t.bbox &&
                                (e = [
                                    [parseFloat(t.bbox[1]), parseFloat(t.bbox[0])],
                                    [parseFloat(t.bbox[3]), parseFloat(t.bbox[2])],
                                ]),
                            { x: Number(t.center[0]), y: Number(t.center[1]), label: t.place_name ? t.place_name : t.text, bounds: e, raw: t }
                        );
                    });
                }),
                e
            );
        })(w),
        F = (function (t) {
            function e(e) {
                var r;
                void 0 === e && (e = {});
                var n = "https://api-adresse.data.gouv.fr";
                return ((r = t.call(this, e) || this).searchUrl = e.searchUrl || n + "/search"), (r.reverseUrl = e.reverseUrl || n + "/reverse"), r;
            }
            n(e, t);
            var r = e.prototype;
            return (
                (r.endpoint = function (t) {
                    var e = t.query,
                        r = "string" == typeof e ? { q: e } : e;
                    switch (t.type) {
                        case p.REVERSE:
                            return this.getUrl(this.reverseUrl, r);
                        default:
                            return this.getUrl(this.searchUrl, r);
                    }
                }),
                (r.parse = function (t) {
                    return t.data.features.map(function (t) {
                        return { x: t.geometry.coordinates[0], y: t.geometry.coordinates[1], label: t.properties.label, bounds: null, raw: t };
                    });
                }),
                e
            );
        })(w);
    (t.AlgoliaProvider = k),
        (t.BingProvider = C),
        (t.EsriProvider = P),
        (t.GeoApiFrProvider = F),
        (t.GeoSearchControl = L),
        (t.GeocodeEarthProvider = S),
        (t.GoogleProvider = R),
        (t.HereProvider = j),
        (t.JsonProvider = w),
        (t.LocationIQProvider = N),
        (t.MapBoxProvider = M),
        (t.OpenCageProvider = A),
        (t.OpenStreetMapProvider = q),
        (t.PeliasProvider = U),
        (t.SearchControl = L),
        (t.SearchElement = y);
});
//# sourceMappingURL=geosearch.umd.js.map