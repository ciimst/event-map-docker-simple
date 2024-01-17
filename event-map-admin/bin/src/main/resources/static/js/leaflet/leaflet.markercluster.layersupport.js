/*!
 Leaflet.MarkerCluster.LayerSupport 2.0.1+649b3a9
 (c) 2015-2018 Boris Seang
 License MIT
 */
!function (e, r) {
	"function" == typeof define && define.amd ? define(["leaflet"], r) : r("object" == typeof module && module.exports ? require("leaflet") : e.L)
}(this, function (e, r) {
	e.MarkerClusterGroup.LayerSupport = e.MarkerClusterGroup.extend({
		options: {singleAddRemoveBufferDuration: 0},
		initialize: function (r) {
			e.MarkerClusterGroup.prototype.initialize.call(this, r), this._featureGroup = new o, this._featureGroup.addEventParent(this), this._nonPointGroup = new o, this._nonPointGroup.addEventParent(this), this._layers = {}, this._proxyLayerGroups = {}, this._proxyLayerGroupsNeedRemoving = {}, this._singleAddRemoveBuffer = []
		},
		checkIn: function (e) {
			var r = this._toArray(e);
			return this._checkInGetSeparated(r), this
		},
		checkOut: function (r) {
			var o, t, i = this._toArray(r),
				a = this._separateSingleFromGroupLayers(i, {groups: [], singles: []}), s = a.groups,
				n = a.singles;
			for (o = 0; o < n.length; o++) t = n[o], delete this._layers[e.stamp(t)], delete t._mcgLayerSupportGroup;
			for (this._originalRemoveLayers(n), o = 0; o < s.length; o++) t = s[o], this._dismissProxyLayerGroup(t);
			return this
		},
		addLayers: function (r) {
			var o, t, i, a = this._toArray(r), s = this._checkInGetSeparated(a), n = s.groups;
			for (this._originalAddLayers(s.singles), o = 0; o < n.length; o++) t = n[o], i = e.stamp(t), this._proxyLayerGroups[i] = t, delete this._proxyLayerGroupsNeedRemoving[i], this._map && this._map._originalAddLayer(t)
		},
		addLayer: function (e) {
			return this._bufferSingleAddRemove(e, "addLayers"), this
		},
		_originalAddLayer: e.MarkerClusterGroup.prototype.addLayer,
		_originalAddLayers: e.MarkerClusterGroup.prototype.addLayers,
		removeLayers: function (r) {
			var o, t, i = this._toArray(r),
				a = this._separateSingleFromGroupLayers(i, {groups: [], singles: []}), s = a.groups,
				n = a.singles, p = 0;
			for (this._originalRemoveLayers(n); p < s.length; p++) o = s[p], t = e.stamp(o), delete this._proxyLayerGroups[t], this._map ? this._map._originalRemoveLayer(o) : this._proxyLayerGroupsNeedRemoving[t] = o;
			return this
		},
		removeLayer: function (e) {
			return this._bufferSingleAddRemove(e, "removeLayers"), this
		},
		_originalRemoveLayer: e.MarkerClusterGroup.prototype.removeLayer,
		_originalRemoveLayers: e.MarkerClusterGroup.prototype.removeLayers,
		onAdd: function (r) {
			r._originalAddLayer = r._originalAddLayer || r.addLayer, r._originalRemoveLayer = r._originalRemoveLayer || r.removeLayer, e.extend(r, i);
			var o, t, a, s = this._removePreAddedLayers(r);
			this._originalOnAdd.call(this, r);
			for (o in this._proxyLayerGroups) t = this._proxyLayerGroups[o], r._originalAddLayer(t);
			for (o in this._proxyLayerGroupsNeedRemoving) t = this._proxyLayerGroupsNeedRemoving[o], r._originalRemoveLayer(t), delete this._proxyLayerGroupsNeedRemoving[o];
			for (a = 0; a < s.length; a++) r.addLayer(s[a])
		},
		_originalOnAdd: e.MarkerClusterGroup.prototype.onAdd,
		_bufferSingleAddRemove: function (r, o) {
			var t, i = this.options.singleAddRemoveBufferDuration;
			i > 0 ? (this._singleAddRemoveBuffer.push({
				type: o,
				layer: r
			}), this._singleAddRemoveBufferTimeout || (t = e.bind(this._processSingleAddRemoveBuffer, this), this._singleAddRemoveBufferTimeout = setTimeout(t, i))) : this[o](r)
		},
		_processSingleAddRemoveBuffer: function () {
			for (var e, r, o = this._singleAddRemoveBuffer, t = 0, i = []; t < o.length; t++) e = o[t], r || (r = e.type), e.type === r ? i.push(e.layer) : (this[r](i), r = e.type, i = [e.layer]);
			this[r](i), o.length = 0, clearTimeout(this._singleAddRemoveBufferTimeout), this._singleAddRemoveBufferTimeout = null
		},
		_checkInGetSeparated: function (r) {
			var o, t, i = this._separateSingleFromGroupLayers(r, {groups: [], singles: []}),
				a = i.groups, s = i.singles;
			for (o = 0; o < a.length; o++) t = a[o], this._recruitLayerGroupAsProxy(t);
			for (o = 0; o < s.length; o++) t = s[o], this._removeFromOtherGroupsOrMap(t), this._layers[e.stamp(t)] = t, t._mcgLayerSupportGroup = this;
			return i
		},
		_separateSingleFromGroupLayers: function (r, o) {
			for (var t, i = o.groups, a = o.singles, s = e.Util.isArray, n = 0; n < r.length; n++) t = r[n], t instanceof e.LayerGroup ? (i.push(t), this._separateSingleFromGroupLayers(t.getLayers(), o)) : s(t) ? this._separateSingleFromGroupLayers(t, o) : a.push(t);
			return o
		},
		_recruitLayerGroupAsProxy: function (r) {
			var o = r._proxyMcgLayerSupportGroup;
			if (o) {
				if (o === this) return;
				o.checkOut(r)
			} else this._removeFromOwnMap(r);
			r._proxyMcgLayerSupportGroup = this, r._originalAddLayer = r._originalAddLayer || r.addLayer, r._originalRemoveLayer = r._originalRemoveLayer || r.removeLayer, r._originalOnAdd = r._originalOnAdd || r.onAdd, r._originalOnRemove = r._originalOnRemove || r.onRemove, e.extend(r, t)
		},
		_dismissProxyLayerGroup: function (o) {
			if (o._proxyMcgLayerSupportGroup !== r && o._proxyMcgLayerSupportGroup === this) {
				delete o._proxyMcgLayerSupportGroup, o.addLayer = o._originalAddLayer, o.removeLayer = o._originalRemoveLayer, o.onAdd = o._originalOnAdd, o.onRemove = o._originalOnRemove;
				var t = e.stamp(o);
				delete this._proxyLayerGroups[t], delete this._proxyLayerGroupsNeedRemoving[t], this._removeFromOwnMap(o)
			}
		},
		_removeFromOtherGroupsOrMap: function (e) {
			var r = e._mcgLayerSupportGroup;
			if (r) {
				if (r === this) return;
				r.checkOut(e)
			} else e.__parent ? e.__parent._group.removeLayer(e) : this._removeFromOwnMap(e)
		},
		_removeFromOwnMap: function (e) {
			e._map && e._map.removeLayer(e)
		},
		_removePreAddedLayers: function (e) {
			var r, o = this._layers, t = [];
			for (var i in o) r = o[i], r._map && (t.push(r), e._originalRemoveLayer(r));
			return t
		},
		_toArray: function (r) {
			return e.Util.isArray(r) ? r : [r]
		}
	});
	var o = e.FeatureGroup.extend({
		addLayer: function (r) {
			if (this.hasLayer(r)) return this;
			r.addEventParent(this);
			var o = e.stamp(r);
			return this._layers[o] = r, this._map && this._map._originalAddLayer(r), this.fire("layeradd", {layer: r})
		}, removeLayer: function (r) {
			if (!this.hasLayer(r)) return this;
			r in this._layers && (r = this._layers[r]), r.removeEventParent(this);
			var o = e.stamp(r);
			return this._map && this._layers[o] && this._map._originalRemoveLayer(this._layers[o]), delete this._layers[o], this.fire("layerremove", {layer: r})
		}, onAdd: function (e) {
			this._map = e, this.eachLayer(e._originalAddLayer, e)
		}, onRemove: function (e) {
			this.eachLayer(e._originalRemoveLayer, e), this._map = null
		}
	}), t = {
		addLayer: function (e) {
			var r = this.getLayerId(e);
			return this._layers[r] = e, this._map ? this._proxyMcgLayerSupportGroup.addLayer(e) : this._proxyMcgLayerSupportGroup.checkIn(e), this
		}, removeLayer: function (e) {
			var r = e in this._layers ? e : this.getLayerId(e);
			return this._proxyMcgLayerSupportGroup.removeLayer(e), delete this._layers[r], this
		}, onAdd: function () {
			this._proxyMcgLayerSupportGroup.addLayers(this.getLayers())
		}, onRemove: function () {
			this._proxyMcgLayerSupportGroup.removeLayers(this.getLayers())
		}
	}, i = {
		addLayer: function (e) {
			return e._mcgLayerSupportGroup ? e._mcgLayerSupportGroup._originalAddLayer(e) : this._originalAddLayer(e)
		}, removeLayer: function (e) {
			return e._mcgLayerSupportGroup ? e._mcgLayerSupportGroup._originalRemoveLayer(e) : this._originalRemoveLayer(e)
		}
	};
	e.markerClusterGroup.layerSupport = function (r) {
		return new e.MarkerClusterGroup.LayerSupport(r)
	}
});