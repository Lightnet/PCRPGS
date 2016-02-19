pc.extend(pc, {
	ui: (function () {
		var width = 1280;
		var height = 720;
		var sections = {};
		var $svg, $overlay, $text, $defs;
		var app = pc.Application.getApplication();
		var dirty;

		pc.ComponentSystem.on('postUpdate', function () {
			if (dirty) {
				dirty = false;
				draw();
			}
		});

		function redraw() {
			dirty = true;
		}

		function guid() {
			return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16).toUpperCase();
			});
		}

		var extensions = {};

		var uiData = [];

		function scan(item, parent) {
			if (!item.visible()) {
				return;
			}
			var that, k;
			if (!Array.isArray(item)) {
				that = [];
				for (var j = 0; j < item.length; j++) {
					scan(section[j], that);
				}
				for (k in item._) {
					if (item._.hasOwnProperty(k)) {
						that[k] = item._[k]();
					}
				}


			}
			else {
				that = {};
				for (k in item._) {
					if (item._.hasOwnProperty(k)) {
						that[k] = item._[k]();
					}
				}

			}
			that.on = item._.on;
			parent.push(that);
			return that;
		}

		function applyDefaults(s, group) {
			if (group) {
				s.attr('transform', function (d) {
					var offset = d.offset();
					var rotate = d.rotate();

					var t = [];
					t.push('translate(' + offset[0] + ',' + offset[1] + ')');
					if (rotate) {
						t.push('rotate(' + rotate + ')');
					}
					return t.join(' ');
				});
			}
			else {
				s.attr({
					x: function (d) {
						return d.offset()[0];
					},
					y: function (d) {
						return d.offset()[1];
					},
					transform: function (d) {
						var v;
						if (v = d.rotate()) {
							return 'rotate(' + v + ')';
						}
					}
				});
			}


			s.style('clip-path', function (d) {
				var clip = d.clip();
				if (clip) {
					clips.push({
						id: 'path' + d._.guid,
						x: clip.x,
						y: clip.y,
						width: clip.width,
						height: clip.height,
						type: 'rect'
					});
					return 'url(#path' + d._.guid + ')';
				}
				else {
					return undefined;
				}
			});

			s.style({
				'font-family': function (d) {
					return d.fontFamily();
				},
				'font-size': function (d) {
					return d.fontSize() + 'px';
				},
				'font-weight': function (d) {
					return d.fontWeight();
				},
				'fill': function (d) {
					return d.color();
				},
				'stroke': function (d) {
					return d.strokeWidth() ? d.stroke() : undefined;
				},
				'stroke-width': function (d) {
					return d.strokeWidth();
				}
			});

			s
				.each(function (d) {
					var style = d.style();
					var i;
					for (i in style) {
						s.style(i, style[i]);
					}
					var attr = d.attr();
					for (i in attr) {
						s.style(i, attr[i]);
					}

					if (d.wired) return;
					d.wired = true;
					for (var o in d._.on) {
						if (d._.on.hasOwnProperty(o)) {
							(function (d,o) {
							    try {
    								d._.eventObject(s).on(o, function (v) {
    									d._.on[o].call(this, d3.event, v);
    								});
							    } catch(e) {
							        console.log("Cound not attach to ", d, d._.eventObject(d));
							    }
							})(d,o);
						}
					}
					
				});



		}

		var clips = [];

		function draw() {
			ensureSvg();
			uiData.length = 0;
			clips.length = 0;
			var i;

			$svg.selectAll('defs').remove();
			$defs = $svg.append('defs');

			for (i in sections) {
				if (sections.hasOwnProperty(i)) {
					uiData.push(sections[i]);
				}
			}

			buildGroups($svg, uiData);
			for (i = 0; i < clips.length; i++) {
				var clip = clips[i];
				$defs
					.append('clipPath')
					.attr('id', clip.id)
					.append(clip.type)
					.attr({
						x: clip.x,
						y: clip.y,
						cx: clip.x,
						cy: clip.y,
						width: clip.width,
						height: clip.height,
						r: clip.radius
					});
			}

		}

		function buildGroups(s, data) {


			for (var i = 0; i < data.length; i++) {
				var d = data[i];
				var g = s.selectAll('._' + d._.guid).data(d.visible() ? [d] : []);
				if (Array.isArray(d)) {
					g
						.enter()
						.append('g')
						.classed('_' + d._.guid, true);
					g
						.exit()
						.remove();

					applyDefaults(g, true);
					if(d.visible()) buildGroups(g, d);


				}
				else {

					g
						.enter()
						.append(d._.type)
						.classed('_' + d._.guid, true);

					g
						.exit()
						.remove();


					applyDefaults(g, d._.make(g, d));

				}

			}
		}

		function ensureSvg() {
			if (!$svg) {
				$overlay = d3.select('body').append('div').classed('overlay', true).style({
					'background-color': 'rgba(50,50,50,1)',
					pointerEvents: 'all',
					userSelect: 'none',
					opacity: 1,
					display: 'none'
				});
				$overlay.hide = function () {
					$overlay.style({ display: 'none' });
					return $overlay;
				};
				$overlay.show = function () {
					$overlay.style({ display: 'block' });
					return $overlay;
				};
				$overlay.fadeIn = function (t) {
					t = t === undefined ? 1 : t;
					var time = 0;
					$overlay.style({
						opacity: 0,
						display: 'block'
					});
					function fader(dt) {
						time += dt / t;
						$overlay.style({ opacity: Math.min(1, time) });
						if (time >= 1) {
							app.off('update', fader);
						}
					}

					app.on('update', fader);
					return $overlay;
				};
				$overlay.fadeOut = function (t) {
					t = t === undefined ? 1 : t;
					var time = 0;

					function fader(dt) {
						time += dt / t;
						$overlay.style({ opacity: Math.max(0, 1 - time) });
						if (time >= 1) {
							app.off('update', fader);
							$overlay.hide();
						}
					}

					app.on('update', fader);
					return $overlay;
				};
				$svg = d3.select('body').append('svg').attr({
					xmlns: "http://www.w3.org/2000/svg",
					version: "1.1",
					id: 'uisvg',
					viewBox: '0 0 ' + width + ' ' + height
				}).style('user-select', 'none');
				$defs = $svg.append('defs');
				$text = $svg.append('g');

				sizeLayers();
			}
		}

		function sizeLayers() {
			if (!$overlay) {
				return;
			}
			setTimeout(function () {
				ensureSvg();
				var canvas = d3.select('#application-canvas');
				if (!canvas.node()) {
					sizeLayers();
					return;
				}
				var rect = d3.select('#application-canvas').position();
				$overlay.style({
					position: 'absolute',
					left: rect.left + 'px',
					top: rect.top + 'px',
					width: rect.width + 'px',
					height: rect.height + 'px'
				});
				$svg.style({
					position: 'absolute',
					left: rect.left,
					top: rect.top,
					width: rect.width,
					height: rect.height
				});

			}, 50);
		}


		function merge(target, src) {
			for (var i in src) {
				if (src.hasOwnProperty(i)) {
					if (typeof src[i] == 'object') {
						target[i] = merge(target[i] || {}, src[i]);
					}
					else {
						target[i] = src[i];
					}
				}
			}
			return target;
		}

		function makeGroup(parent, parentName) {
			parentName = parentName || 'section';
			return function (name, existing) {
				var group = existing || [];
				group.group = function (name, existing) {
					var newGroup = makeGroup(group, 'parent')(name, existing);
					if (Array.isArray(group))
						group.push(newGroup);
					return newGroup;
				};
				addAccessors(group, {}, parent, parentName, name);
				group.remove = function () {
					if (Array.isArray(parent)) {
						var idx = parent.indexOf(group);
						if (idx != -1) {
							parent.splice(i, 1);
						}
					}
					else {
						delete parent[name];
					}
					return group;
				};
				group.clear = function () {
					group.length = 0;
					return group;
				};

				group.input = function (name) {
					var input = addAccessors({}, {
						value: function () {
							return '';
						},
						width: function () {
							return 800;
						},
						height: function () {
							return 800;
						},
						type: 'foreignObject',
						eventObject: function(i) {
						    return d3.select("input", i[0]);
						},
						make: function (i, d) {
							if (input.created) {
								i.selectAll('input').data([d]);
								i
									.property('value', function (d) {
										return d.value();
									});
								return;
							}
							input.created = true;
							i
								.attr({
									width: function (d) {
										return d.width();
									},
									height: function (d) {
										return d.height();
									}
								});

							i
								.html('<body xmlns="http://www.w3.org/1999/xhtml"><input type="text" value="test"/></body>');
							var j = i.select('input');
							j.datum(d).property('value', function (d) {
								return d.value();
							});
                            applyDefaults(j, false, true);
							



						}
					}, group, parentName, name);

					input.value = function (v) {
						if (v === undefined) {
							return input._.value();
						}
						else {
							input._.value = typeof v === 'function' ? v : function () {
								return v;
							};
							redraw();
							return input;
						}
					};

					input.width = function (w) {
						if (w === undefined) {
							return input._.width();
						}
						else {
							input._.width = typeof w == 'function' ? w : function () {
								return w;
							};
							redraw();
							return input;
						}
					};

					input.height = function (h) {
						if (h === undefined) {
							return input._.height();
						}
						else {
							input._.height = typeof h == 'function' ? h : function () {
								return h;
							};
							redraw();
							return input;
						}
					};

					group.push(input);
					return input;
				};

				group.image = function (name) {
					var image = addAccessors({}, {
						url: function () {
							return '';
						},
						width: function () {
							return 64;
						},
						height: function () {
							return 64;
						},
						type: 'image',
						make: function (i) {
							i
								.attr({
									'xlink:href': function (d) {
										return d.url();
									},
									width: function (d) {
										return d.width();
									},
									height: function (d) {
										return d.height();
									}
								})
								.style({
									'object-fit': 'cover'
								});

						}
					}, group, parentName, name);
					image.url = function (url) {
						if (url === undefined) {
							return image._.url();
						}
						else {
							image._.url = typeof url === 'function' ? url : function () {
								return url;
							};
							redraw();

						}
						return image;
					};
					image.width = function (w) {
						if (w === undefined) {
							return image._.width();
						}
						else {
							image._.width = typeof w == 'function' ? w : function () {
								return w;
							};
							redraw();
							return image;
						}
					};

					image.height = function (h) {
						if (h === undefined) {
							return image._.height();
						}
						else {
							image._.height = typeof h == 'function' ? h : function () {
								return h;
							};
							redraw();
							return image;
						}
					};

					group.push(image);
					return image;
				};
				group.text = function (name) {
					var text = addAccessors({}, {
						value: function () {
							return '';
						},
						anchor: function () {
							return 'middle';
						},
						lineLength: function () {
							return undefined;
						},
						lineHeight: function () {
							return 20;
						},
						baseLine: function () {
							return 'middle';
						},
						type: 'g',
						make: function (t, d) {
							var text = d.value();
							var result = [];
							var length = d.lineLength();
							text = Array.isArray(text) ? text : [text];
							for (var i = 0; i < text.length; i++) {
								var lines = ('' + text[i]).split('\n');
								for (var j = 0; j < lines.length; j++) {
									if (length && lines[j].length > length) {
										var words = lines[j].split(' ');
										var line = '';
										var c = 0;
										while (c < words.length) {
											do {
												line += words[c++] + ' ';
											} while (c < words.length && (line.length + words[c].length) < length);
											result.push(line.trim());
											line = '';
										}
									}
									else {
										result.push(lines[j]);
									}
								}
							}
							var lineHeight = d.lineHeight();
							var anchor = d.anchor();
							var baseline = d.baseLine();

							var l = t.selectAll('text').data(result);
							l
								.enter()
								.append('text');

							l
								.attr({
									x: 0,
									y: function (d, i) {
										return i * lineHeight;
									},
									'text-anchor': anchor
								})
								.style({
									'clip-path': 'url(#path' + d._.guid + ')',
									'alignment-baseline': baseline,
									'user-select': 'none',
									'-webkit-user-select': 'none',
									'cursor': 'default'

								})
								.text(function (d) {
									return d;
								});

							l
								.exit()
								.remove();
							return true;

						}
					}, group, parentName, name);

					text.baseLine = function (v) {
						if (v === undefined) {
							return text._.baseLine();
						}
						else {
							text._.baseLine = typeof v == 'function' ? v : function () {
								return v;
							};
							redraw();

							return text;
						}
					};
					text.value = function (v) {
						if (v === undefined) {
							return text._.value();
						}
						else {
							text._.value = typeof v == 'function' ? v : function () {
								return v;
							};
							redraw();

							return text;
						}
					};
					text.lineHeight = function (h) {
						if (h === undefined) {
							return text._.lineHeight();
						}
						else {
							text._.lineHeight = typeof h == 'function' ? h : function () {
								return h;
							};
							return text;
						}
					};
					text.anchor = function (a) {
						if (a === undefined) {
							return text._.anchor();
						}
						else {
							text._.anchor = typeof a == 'function' ? a : function () {
								return a;
							};
							redraw();

							return text;
						}
					};
					text.lineLength = function (ll) {
						if (ll === undefined) {
							return text._.lineLength();
						}
						else {
							text._.lineLength = typeof ll == 'function' ? ll : function () {
								return ll;
							};
							redraw();

							return text;
						}
					};
					group.push(text);
					return text;
				};
				group.rectangle = function (name) {
					var rect = addAccessors({}, {
						width: function () {
							return 20;
						},
						height: function () {
							return 20;
						},
						type: 'rect',
						make: function (r) {
							r.attr({
								width: function (d) {
									return d.width();
								},
								height: function (d) {
									return d.height();
								}
							});
						}
					}, group, parentName, name);
					rect.width = function (w) {
						if (w === undefined) {
							return rect._.width();
						}
						else {
							rect._.width = typeof w == 'function' ? w : function () {
								return w;
							};
							redraw();

							return rect;
						}
					};
					rect.height = function (h) {
						if (h === undefined) {
							return rect._.height();
						}
						else {
							rect._.height = typeof h == 'function' ? h : function () {
								return h;
							};
							redraw();

							return rect;
						}
					};
					group.push(rect);
					return rect;
				};
				group.circle = function (name) {
					var circle = addAccessors({}, {
						radius: function () {
							return 10;
						},
						group: function () {
							return group;
						},
						type: 'circle',
						make: function (c) {
							c
								.attr({
									r: function (d) {
										return d.radius();
									}
								})
						}
					}, group, parentName, name);
					circle.radius = function (r) {
						if (r === undefined) {
							return circle._.radius();
						}
						else {
							circle._.radius = typeof r == 'function' ? r : function () {
								return r;
							};
							redraw();

							return circle;
						}
					};
					group.push(circle);
					return circle;
				};
				group.arc = function (name) {
					var arc = addAccessors({}, {
						outerRadius: function () {
							return 20;
						},
						innerRadius: function () {
							return 10;
						},
						startAngle: function () {
							return 0;
						},
						endAngle: function () {
							return 360;
						},
						type: 'path',
						make: function (t) {
							var arc = d3.svg.arc();
							arc.innerRadius(function (d) {
								return d.innerRadius();
							});
							arc.outerRadius(function (d) {
								return d.outerRadius();
							});
							arc.startAngle(function (d) {
								return d.startAngle();
							});
							arc.endAngle(function (d) {
								return d.endAngle();
							});
							t
								.attr('d', arc);
						}
					}, group, parentName, name);

					arc.innerRadius = function (ir) {
						if (ir === undefined) {
							return arc._.innerRadius();
						}
						else {
							arc._.innerRadius = typeof ir === 'function' ? ir : function () {
								return ir;
							};
							redraw();

							return arc;
						}
					};
					arc.outerRadius = function (or) {
						if (or === undefined) {
							return arc._.outerRadius();
						}
						else {
							arc._.outerRadius = typeof or === 'function' ? or : function () {
								return or;
							};
							redraw();

							return arc;
						}
					};
					arc.startAngle = function (sa) {
						if (sa === undefined) {
							return arc._.startAngle();
						}
						else {
							arc._.startAngle = typeof sa === 'function' ? sa : function () {
								return sa;
							};
							redraw();

							return arc;
						}
					};
					arc.endAngle = function (ea) {
						if (ea === undefined) {
							return arc._.endAngle();
						}
						else {
							arc._.endAngle = typeof ea === 'function' ? ea : function () {
								return ea;
							};
							redraw();

							return arc;
						}
					};
					arc.percent = function (p) {
						if (p === undefined) {
							return arc._.endAngle / (Math.PI * 2);
						}
						else {
							arc._.startAngle = function () {
								return 0;
							};
							arc._.endAngle = typeof p == 'function' ? function () {
								return p() / 100 * Math.PI * 2;
							} : function () {
								return p / 100 * Math.PI * 2;
							};
							redraw();

						}
						return arc;
					};
					group.push(arc);
					return arc;
				};

				for (var i in extensions) {
					if (extensions.hasOwnProperty(i)) {
						extensions[i](group, parentName);
					}
				}
				return group;
			};
		}

		window.addEventListener('resize', sizeLayers);

		var defaults = {
			on: {},
			fontFamily: function () {
				return 'Arial';
			},
			fontSize: function () {
				return 20
			},
			fontWeight: function () {
				return 'normal';
			},
			color: function () {
				return 'white';
			},
			stroke: function () {
				return 'black';
			},
			strokeWidth: function () {
				return undefined;
			},
			offset: function () {
				return [0, 0];
			},
			rotate: function () {
				return 0;
			},
			follow: function () {
				return null;
			},
			visible: function () {
				return true;
			},
			style: function () {
				return {};
			},
			attr: function () {
				return {};
			},
			clip: function () {
				return undefined;
			}
		};
		
		function returnParam(p) {
		    return p;
		}

		function addAccessors(item, extra, parent, parentName, name) {
			item._ = item._ || merge(merge({}, extra || {}), defaults);
			item._.guid = guid();
			item._.eventObject = item._.eventObject || returnParam;
			if (parent && Array.isArray(parent)) {
				if (name) {
					parent[name] = item;
				}
				item.remove = function () {
					var idx = parent.indexOf(item);
					if (idx != -1) {
						parent.splice(idx, 1);
					}
					if (name) {
						delete parent[name];
					}
				};
				item.parent = function (p) {
					if (p == undefined)
						return parent;
					else {
						redraw();
						item.remove();
						parent = p;
						parent.push(this);
					}
					return item;
				};

			}

			if (Array.isArray(item)) {
				item.add = function (child) {
					child.parent(item);
				};
			}

			item.clone = function () {
				var clone = Array.isArray(item) ? [] : {};
				merge(clone, item);
				clone._ = merge({}, item._);
				return clone;
			};
			if (parentName) {
				item[parentName] = function () {
					return parent;
				};
			}

			item.click = function (fn) {
				item._.on.click = fn;
				return item;
			};
			item.on = function (name, fn) {
				item._.on[name] = fn;
				return item;
			};
			item.off = function (name) {
				delete item._.on[name];
				return item;
			};
			item.fadeIn = function (t) {
				t = t === undefined ? 1 : t;
				item.faded = true;
				
				var complete;
				item.then = function (fn) {
					complete = fn.bind(item);
					return item;
				};
				var time = 0;
				item.style({
					opacity: 0
				});
				item.visible(true);
				function fader(dt) {
					time += dt / t;
					item.style({ opacity: Math.min(1, time) });
					if (time >= 1) {
						if (complete) complete(item);
						app.off('update', fader);
					}
				}

				app.on('update', fader);
				return item;
			};
			item.follow = function (t, offset, c) {
				if (t) {
					if (typeof t == 'string') {
						item._.follow = app.root.findByName(t);
					}
					else {
						item._.follow = t;
					}
					item._.followCamera = c;
					item._.followOffset = typeof offset == 'function' ? offset : function () {
						return offset;
					};
					pc.ComponentSystem.on('postUpdate', item._.follower);
				}
				else {
					item._.follow = null;
					pc.ComponentSystem.off('postUpdate', item._.follower);
				}
				return item;
			};
			item._.follower = function () {
				var follow = item._.follow;
				if (!follow) {
					return;
				}
				var offset = item._.followOffset ? item._.followOffset() : undefined;
				offset =
					offset || {
						x: 0,
						y: 0,
						z: 0
					};
				offset.x = offset.x || 0;
				offset.y = offset.y || 0;
				offset.z = offset.z || 0;
				var screenOffset = item._.setOffset ? item._.setOffset() : [0, 0];
				screenOffset = screenOffset || [0, 0];
				var activeCamera = item._.followCamera || app.systems.camera.cameras[app.systems.camera.cameras.length - 1];
				var pos = activeCamera.worldToScreen(follow.getPosition().clone().add(new pc.Vec3(offset.x,
					offset.y,
					offset.z)));
				if (pos.z < 0 || !follow.enabled) {
					pos.x = -100000;
				}
				pos.x = pos.x / app.graphicsDevice.width * width + (screenOffset[0] || 0);
				pos.y = pos.y / app.graphicsDevice.height * height + (screenOffset[1] || 0);
				item.offset(pos.x, pos.y, true);
			};
			item.fadeOut = function (t) {
				t = t === undefined ? 1 : t;
				var time = 0;
				var complete = function () {
				};
				item.then = function (fn) {
					complete = fn.bind(item);
					return item;
				};

				function fader(dt) {
					time += dt / t;
					item.style({ opacity: Math.max(0, 1 - time) });
					if (time >= 1) {
						app.off('update', fader);
						complete();
					}
				}

				app.on('update', fader);
				return item;
			};

			item.style = function (s) {
				if (s === undefined) {
					return item._.style();
				}
				else {
					item._.style = typeof s === 'function' ? s : function () {
						return s;
					};
					redraw();
					return item;
				}
			};


			item.attr = function (s) {
				if (s === undefined) {
					return item._.attr();
				}
				else {
					item._.attr = typeof s === 'function' ? s : function () {
						return s;
					};
					redraw();
					return item;
				}
			};


			item.offset = function (x, y, internal) {
				if (x === undefined) {
					return item._.offset();
				}
				if (typeof x != 'function') {
					item._.offset = function () {
						return [x, y];
					};
				}
				else {
					item._.offset = x;
				}
				if (!internal) {
					item._.setOffset = item._.offset;
				}
				redraw();
				return item;
			};
			item.visible = function (v) {
				if (v === undefined) {
					return item._.visible();
				}
				else {
					item._.visible = typeof v == 'function' ? v : function () {
						return v;
					};
					redraw();
					return item;
				}
			};
			item.rotate = function (d) {
				if (d === undefined) {
					return item._.rotate();
				}
				else {
					item._.rotate = typeof d == 'function' ? d : function () {
						return d;
					};
					redraw();
					return item;
				}
			};
			item.fontFamily = function (f) {
				if (f === undefined) {
					return item._.fontFamily();
				}
				item._.fontFamily = typeof f == 'function' ? f : function () {
					return f;
				};
				redraw();
				return item;
			};
			item.fontSize = function (s) {
				if (s === undefined) {
					return item._.fontSize();
				}
				else {
					item._.fontSize = typeof s === 'function' ? s : function () {
						return s;
					};
					redraw();
					return item;
				}
			};
			item.fontWeight = function (w) {
				if (w === undefined) {
					return item._.fontWeight();
				}
				else {
					item._.fontWeight = typeof w === 'function' ? w : function () {
						return w;
					};
					redraw();
					return item;
				}
			};
			item.color = function (c) {
				if (c === undefined) {
					return item._.color();
				}
				else {
					item._.color = typeof c === 'function' ? c : function () {
						return c;
					};
					redraw();
					return item;
				}
			};
			item.stroke = function (s) {
				if (s === undefined) {
					return item._.stroke();
				}
				else {
					item._.stroke = typeof s === 'function' ? s : function () {
						return s;
					};
					redraw();
					return item;
				}
			};
			item.strokeWidth = function (s) {
				if (s === undefined) {
					return item._.strokeWidth();
				}
				else {
					item._.strokeWidth = typeof s === 'function' ? s : function () {
						return s;
					};
					redraw();
					return item;
				}
			};
			item.moveTo = function (x, y, t) {
				t = t === undefined ? 1 : t;
				var time = 0;
				var pos = item.offset();
				var initial = pos.slice();
				var target = [x, y];
				var complete = function () {
				};
				item.then = function (fn) {
					complete = fn.bind(item);
					return item;
				};

				function fader(dt) {
					time += dt / t;

					for (var i = 0; i < 2; i++) {
						pos[i] =
							(pc.math.smoothstep(0,
								1,
								time) * (target[i] - initial[i])) + initial[i];
					}

					item.offset(pos[0], pos[1]);

					if (time >= 1) {
						app.off('update', fader);
						complete();
					}
				}

				app.on('update', fader);
				return item;
			};
			item.clip = function (x, y, w, h) {
				if (x === undefined) {
					return item._.clip();
				}
				else {
					item._.clip = typeof x == 'function' ? x : function () {
						return {
							x: x || 0,
							y: y || 0,
							width: w,
							height: h
						};
					};
					redraw();
					return item;
				}
			};
			item.interpolate = function (fn, t) {
				t = t === undefined ? 1 : t;
				var time = 0;

				function fader(dt) {
					time += dt / t;

					fn.call(item, time);

					if (time >= 1) {
						app.off('update', fader);
					}
				}

				app.on('update', fader);
				return item;
			};

			return item;
		}


		var that = {
			anchors: {
				START: 'start',
				MIDDLE: 'middle',
				END: 'end',
				LEFT: 'start',
				CENTER: 'middle',
				RIGHT: 'end'
			},
			forceDraw: draw,
			fonts: {
				Arial: 'Arial'
			},
			initialize: function () {
				ensureSvg();
			},
			extend: function (name, spec) {

				var make = spec.make;
				var type = spec.type;
				if (!make || !type) {
					throw new Error('Must specify a make function and a type');
				}
				if (typeof make != 'function') {
					throw new Error('make must be a function');
				}
				if (typeof type != 'string') {
					throw new Error('type must be a string');
				}
				delete spec.make;
				delete spec.type;


				extensions[name] = function (parent, parentName) {
					parent[name] = function (name) {
						var defaults = {
							make: make,
							type: type
						};
						var obj = {};
						for (var i in spec) {
							if (spec.hasOwnProperty(i)) {
								(function (i) {
									defaults[i] = function () {
										return spec[i];
									};
									obj[i] = function (v) {
										if (v === undefined) {
											return obj._[i]();
										}
										else {
											obj._[i] = typeof v === 'function' ? v : function () {
												return v;
											};
											redraw();
											return obj;
										}
									}
								})(i);
							}
						}

						var item = addAccessors(obj,
							defaults || {},
							parent,
							parentName, name);
						return item;
					};
				};
			},
			registerFont: function (url, name) {
				if (name) {
					that.fonts[name] = name;
				}
				var link = document.createElement('link');
				link.setAttribute('href',
					url);
				link.setAttribute('rel', "stylesheet");
				link.setAttribute('type', "text/css");
				document.head.appendChild(link);
			},
			dimensions: function (w, h) {
				width = w || width;
				height = h || height;
				if ($svg) {
					$svg.remove();
					$overlay.remove();
					$svg = null;
				}
			},
			refresh: redraw,
			overlay: function () {
				if (!$svg) ensureSvg();
				return $overlay;
			},
			svg: function () {
				if (!$svg) ensureSvg();
				return $svg;
			},
			section: function (name) {
				name = name || 'default';
				Object.defineProperty(that.sections, name, {
					configurable: true,
					get: function () {
						return that.section(name)
					}
				});
				var section = sections[name];
				if (!section) {
					sections[name] = section = makeGroup(section, 'section')(name);
				}
				return section;
			},
			sections: {}
		};



		that.section('root');
		ensureSvg();

		d3.selection.prototype.position = function () {

			var el = this.node();
			var elPos = el.getBoundingClientRect();
			var vpPos = getVpPos(el);

			function getVpPos(el) {
				if (el.parentElement.tagName.toLowerCase() === 'svg' || el.parentElement.tagName.toUpperCase() === 'BODY') {
					return el.parentElement.getBoundingClientRect();
				}
				return getVpPos(el.parentElement);
			}

			return {
				top: elPos.top - vpPos.top,
				left: elPos.left - vpPos.left,
				width: elPos.width,
				bottom: elPos.bottom - vpPos.top,
				height: elPos.height,
				right: elPos.right - vpPos.left
			};

		};

		return that;

	})()
});
