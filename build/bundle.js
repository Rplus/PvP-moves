
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, callback) {
        const unsub = store.subscribe(callback);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.17.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => store.subscribe((value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function getDexFromUrl(all = false) {
      let dexs = new URLSearchParams(location.search).getAll('dex').map(Number);
      return all ? dexs : dexs[0];
    }

    function toJSON(res) {
      return res.json();
    }

    function genOptions(v, l = v) {
      return `<option value="${v}" label="${l}"></option>`;
    }
    function copy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    function fixNum(num, d = 2, toStr) {
      let op = (+num).toFixed(d);
      return toStr ? op : +op;
    }

    const buffTypes = ['攻', '防'];
    const buffTargets = {
      opponent: '敵',
      self: '己',
    };

    function introEffect(move) {
      let buffs = move.buffs.map((b, index) => {
        if (!b) { return ''}
        return `${b > 0 ? '+' : ''}${b}階${buffTypes[index]}`;
      }).filter(Boolean).join(', ');
      return `${move.buffApplyChance * 100}%, ${buffs}, [${buffTargets[move.buffTarget]}]`;
    }


    const STORAGE_KEY = 'PvP-Moves';
    function saveItem(data) {
      if (!data || !data.key) { return false;}
      let odata = getItem() || {};

      odata[data.key] = data.value;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(odata));
    }


    function getItem(key) {
      let data = localStorage.getItem(STORAGE_KEY);
      if (!data) { return null; }
      data = JSON.parse(data);

      return key ? data[key] : data;
    }


    const CPM = {
      '8': 0.37523559,
      '13': 0.48168495,
    };

    function calPmCP(base, adsl) {
      let [a, d, s, l] = adsl;
      let mFactor = CPM[l];
      let ADS = (base.atk + a) * Math.pow((base.def + d) * (base.sta + s), 0.5);
      let total = ADS * Math.pow(mFactor, 2.0);

      return Math.max(10, Math.floor(total / 10));
    }
    function calPmWOWCP(base, lv) {
      let o = [10, 11, 12, 13, 14, 15];
      let max = calPmCP(base, [10, 10, 10, lv]);

      for (let ia of o) {
        for (let id of o) {
          for (let is of o) {
            let c = calPmCP(base, [ia, id, is, lv]);
            if (c <= max) {
              continue;
            } else if (ia < 12 || id < 12 || is < 12) {
              max = c;
            }
          }
        }
      }

      return max + 1;
    }

    const defaultDex = 371;
    const dex = writable(getDexFromUrl() || defaultDex);
    const queryHistory = writable(getDexFromUrl(true));

    dex.subscribe(_dex => {
      queryHistory.update(arr => {
        return [...new Set([...arr, _dex].reverse())].reverse().slice(-10);
      });
      history.pushState({dex: _dex}, null, `?dex=${_dex}`);
    });

    window.addEventListener('popstate', (e) => {
      let dexOnUrl = getDexFromUrl();
      dex.set(dexOnUrl);
    });

    const pokemon = writable([]);
    const moves = writable([]);

    const gmUrl = 'gm.json' ;

    fetch(gmUrl)
    .then(toJSON)
    .then(d => {
      console.log('gm done:', d);
      pokemon.set(d.pokemon);
      moves.set(d.moves);
    });

    const datalist = derived(
      pokemon,
      $pokemon =>
        $pokemon.map(pm =>
          genOptions(pm.dex, `${pm.name}, ${pm.id}`.toUpperCase())).join('')
    );



    //
    //
    //
    //
    //


    const gridview = createGridview();
    const darktheme = createDarktheme();

    function createGridview() {
      let b = Boolean(getItem('gridview'));
      const { subscribe, set, update } = writable(b);

      return {
        subscribe,
        set: (n) => {
          set(n);
          saveItem({
            key: 'gridview',
            value: n,
          });
        },
      };
    }

    function createDarktheme() {
      // detect for css
      let os_settings = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      let b = getItem('darktheme');
      if (b === null) {
        b = os_settings;
      }
      const { subscribe, set, update } = writable(Boolean(b));

      return {
        subscribe,
        set: (n) => {
          set(n);
          saveItem({
            key: 'darktheme',
            value: n,
          });
        },
      };
    }

    /* src/Selector.html generated by Svelte v3.17.1 */
    const file = "src/Selector.html";

    function create_fragment(ctx) {
    	let form;
    	let label;
    	let t1;
    	let div;
    	let input;
    	let t2;
    	let button;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let datalist_1;
    	let dispose;

    	const block = {
    		c: function create() {
    			form = element("form");
    			label = element("label");
    			label.textContent = "Dex: #";
    			t1 = space();
    			div = element("div");
    			input = element("input");
    			t2 = space();
    			button = element("button");
    			t3 = text("🤜 ");
    			t4 = text(/*pmName*/ ctx[2]);
    			t5 = text(" 🤛");
    			t6 = space();
    			datalist_1 = element("datalist");
    			attr_dev(label, "class", "mr-2");
    			attr_dev(label, "for", "dex");
    			add_location(label, file, 32, 2, 737);
    			attr_dev(input, "list", "pm-names");
    			attr_dev(input, "class", "pm-dex-selector mr-2 svelte-f5albj");
    			attr_dev(input, "id", "dex");
    			attr_dev(input, "name", "dex");
    			input.required = true;
    			attr_dev(input, "pattern", "\\d+");
    			attr_dev(input, "title", "Should be a Number.");
    			add_location(input, file, 34, 4, 821);
    			attr_dev(div, "class", "input-wrapper mr-1 svelte-f5albj");
    			add_location(div, file, 33, 2, 784);
    			attr_dev(button, "type", "submit");
    			attr_dev(button, "class", "svelte-f5albj");
    			add_location(button, file, 46, 2, 1059);
    			attr_dev(datalist_1, "id", "pm-names");
    			add_location(datalist_1, file, 47, 2, 1107);
    			attr_dev(form, "class", "selector card L1-box df ai-b svelte-f5albj");
    			add_location(form, file, 31, 0, 655);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, label);
    			append_dev(form, t1);
    			append_dev(form, div);
    			append_dev(div, input);
    			set_input_value(input, /*dexValue*/ ctx[0]);
    			/*input_binding*/ ctx[8](input);
    			append_dev(form, t2);
    			append_dev(form, button);
    			append_dev(button, t3);
    			append_dev(button, t4);
    			append_dev(button, t5);
    			append_dev(form, t6);
    			append_dev(form, datalist_1);
    			datalist_1.innerHTML = /*$datalist*/ ctx[3];

    			dispose = [
    				listen_dev(input, "input", /*input_input_handler*/ ctx[7]),
    				listen_dev(form, "submit", prevent_default(/*onSubmit*/ ctx[4]), false, true, false)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*dexValue*/ 1 && input.value !== /*dexValue*/ ctx[0]) {
    				set_input_value(input, /*dexValue*/ ctx[0]);
    			}

    			if (dirty & /*pmName*/ 4) set_data_dev(t4, /*pmName*/ ctx[2]);
    			if (dirty & /*$datalist*/ 8) datalist_1.innerHTML = /*$datalist*/ ctx[3];		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			/*input_binding*/ ctx[8](null);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $dex;
    	let $pokemon;
    	let $datalist;
    	validate_store(dex, "dex");
    	component_subscribe($$self, dex, $$value => $$invalidate(5, $dex = $$value));
    	validate_store(pokemon, "pokemon");
    	component_subscribe($$self, pokemon, $$value => $$invalidate(6, $pokemon = $$value));
    	validate_store(datalist, "datalist");
    	component_subscribe($$self, datalist, $$value => $$invalidate(3, $datalist = $$value));
    	let dexValue = $dex;
    	let dexInput;
    	let pmName = "";

    	function onSubmit(e) {
    		if (!$pokemon.length) {
    			return;
    		}

    		let _dexValue = +e.target.dex.value;
    		let pm = $pokemon.find(pm => pm.dex === _dexValue);

    		if (!pm) {
    			console.error(`Wrong Dex: ${_dexValue}`);
    			return;
    		}

    		console.info("submit", _dexValue, $dex);
    		set_store_value(dex, $dex = _dexValue);
    	}

    	function input_input_handler() {
    		dexValue = this.value;
    		$$invalidate(0, dexValue);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(1, dexInput = $$value);
    		});
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("dexValue" in $$props) $$invalidate(0, dexValue = $$props.dexValue);
    		if ("dexInput" in $$props) $$invalidate(1, dexInput = $$props.dexInput);
    		if ("pmName" in $$props) $$invalidate(2, pmName = $$props.pmName);
    		if ("$dex" in $$props) dex.set($dex = $$props.$dex);
    		if ("$pokemon" in $$props) pokemon.set($pokemon = $$props.$pokemon);
    		if ("$datalist" in $$props) datalist.set($datalist = $$props.$datalist);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$pokemon, dexValue*/ 65) {
    			 {
    				let target = $pokemon.find(pm => pm.dex === +dexValue);
    				$$invalidate(2, pmName = target && target.name || "NG");
    			}
    		}
    	};

    	return [
    		dexValue,
    		dexInput,
    		pmName,
    		$datalist,
    		onSubmit,
    		$dex,
    		$pokemon,
    		input_input_handler,
    		input_binding
    	];
    }

    class Selector extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Selector",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/Move.html generated by Svelte v3.17.1 */

    const file$1 = "src/Move.html";

    // (28:2) {:else}
    function create_else_block(ctx) {
    	let div0;
    	let t0_value = /*mdata*/ ctx[0].power + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let t3_value = /*mdata*/ ctx[0].energy + "";
    	let t3;
    	let t4;
    	let div2;
    	let t5_value = /*mdata*/ ctx[0].dpe + "";
    	let t5;
    	let t6;
    	let if_block_anchor;
    	let if_block = /*mdata*/ ctx[0].buffs && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text("-");
    			t3 = text(t3_value);
    			t4 = space();
    			div2 = element("div");
    			t5 = text(t5_value);
    			t6 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(div0, "class", "m-power m-grid svelte-1awno4m");
    			attr_dev(div0, "title", "power");
    			add_location(div0, file$1, 28, 4, 970);
    			attr_dev(div1, "class", "m-energy m-energy_c m-grid svelte-1awno4m");
    			attr_dev(div1, "title", "energy");
    			set_style(div1, "--bgzx", /*mdata*/ ctx[0].energy + "%");
    			add_location(div1, file$1, 29, 4, 1036);
    			attr_dev(div2, "class", "m-dpe m-grid svelte-1awno4m");
    			attr_dev(div2, "title", "dpe");
    			add_location(div2, file$1, 30, 4, 1149);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t5);
    			insert_dev(target, t6, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*mdata*/ 1 && t0_value !== (t0_value = /*mdata*/ ctx[0].power + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*mdata*/ 1 && t3_value !== (t3_value = /*mdata*/ ctx[0].energy + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*mdata*/ 1) {
    				set_style(div1, "--bgzx", /*mdata*/ ctx[0].energy + "%");
    			}

    			if (dirty & /*mdata*/ 1 && t5_value !== (t5_value = /*mdata*/ ctx[0].dpe + "")) set_data_dev(t5, t5_value);

    			if (/*mdata*/ ctx[0].buffs) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t6);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(28:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (21:2) {#if mdata.isFast}
    function create_if_block(ctx) {
    	let div0;
    	let t0_value = /*mdata*/ ctx[0].power + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = /*mdata*/ ctx[0].energyGain + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = /*mdata*/ ctx[0].turn + "";
    	let t4;
    	let t5;
    	let div3;
    	let t6_value = /*mdata*/ ctx[0].dpt + "";
    	let t6;
    	let t7;
    	let div4;
    	let t8_value = /*mdata*/ ctx[0].ept + "";
    	let t8;
    	let div4_data_eptxdpt_value;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div4 = element("div");
    			t8 = text(t8_value);
    			attr_dev(div0, "class", "m-power m-grid svelte-1awno4m");
    			attr_dev(div0, "title", "power");
    			add_location(div0, file$1, 21, 4, 494);
    			attr_dev(div1, "class", "m-energy m-grid svelte-1awno4m");
    			attr_dev(div1, "title", "energy");
    			add_location(div1, file$1, 22, 4, 560);
    			attr_dev(div2, "class", "m-turn m-grid svelte-1awno4m");
    			attr_dev(div2, "grid-size", "full");
    			attr_dev(div2, "title", "turn");
    			add_location(div2, file$1, 23, 4, 633);
    			attr_dev(div3, "class", "m-dpt m-grid svelte-1awno4m");
    			attr_dev(div3, "title", "dpt");
    			add_location(div3, file$1, 25, 4, 811);
    			attr_dev(div4, "class", "m-ept m-grid svelte-1awno4m");
    			attr_dev(div4, "title", "ept");
    			attr_dev(div4, "data-eptxdpt", div4_data_eptxdpt_value = /*mdata*/ ctx[0].eptxdpt);
    			add_location(div4, file$1, 26, 4, 871);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, t8);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*mdata*/ 1 && t0_value !== (t0_value = /*mdata*/ ctx[0].power + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*mdata*/ 1 && t2_value !== (t2_value = /*mdata*/ ctx[0].energyGain + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*mdata*/ 1 && t4_value !== (t4_value = /*mdata*/ ctx[0].turn + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*mdata*/ 1 && t6_value !== (t6_value = /*mdata*/ ctx[0].dpt + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*mdata*/ 1 && t8_value !== (t8_value = /*mdata*/ ctx[0].ept + "")) set_data_dev(t8, t8_value);

    			if (dirty & /*mdata*/ 1 && div4_data_eptxdpt_value !== (div4_data_eptxdpt_value = /*mdata*/ ctx[0].eptxdpt)) {
    				attr_dev(div4, "data-eptxdpt", div4_data_eptxdpt_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(21:2) {#if mdata.isFast}",
    		ctx
    	});

    	return block;
    }

    // (32:4) {#if mdata.buffs}
    function create_if_block_1(ctx) {
    	let div;
    	let t_value = /*mdata*/ ctx[0].buffsDes + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "m-effect m-grid svelte-1awno4m");
    			attr_dev(div, "grid-size", "full");
    			attr_dev(div, "title", "effect");
    			add_location(div, file$1, 32, 4, 1231);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*mdata*/ 1 && t_value !== (t_value = /*mdata*/ ctx[0].buffsDes + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(32:4) {#if mdata.buffs}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div4;
    	let div3;
    	let div2;
    	let div0;
    	let div0_data_type_value;
    	let t0;
    	let div1;
    	let t1_value = /*mdata*/ ctx[0].name + "";
    	let t1;
    	let div3_title_value;
    	let div3_data_title_value;
    	let t2;

    	function select_block_type(ctx, dirty) {
    		if (/*mdata*/ ctx[0].isFast) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			if_block.c();
    			attr_dev(div0, "class", "m-icon type-icon mr-1 svelte-1awno4m");
    			attr_dev(div0, "data-type", div0_data_type_value = /*mdata*/ ctx[0].type);
    			add_location(div0, file$1, 15, 6, 338);
    			attr_dev(div1, "class", "m-name svelte-1awno4m");
    			add_location(div1, file$1, 16, 6, 409);
    			attr_dev(div2, "class", "m-title df df-c ai-c");
    			add_location(div2, file$1, 14, 4, 297);
    			attr_dev(div3, "class", "m-info m-grid svelte-1awno4m");
    			attr_dev(div3, "grid-size", "full");
    			attr_dev(div3, "title", div3_title_value = /*mdata*/ ctx[0].moveId);
    			attr_dev(div3, "data-title", div3_data_title_value = /*mdata*/ ctx[0].moveId);
    			add_location(div3, file$1, 13, 2, 201);
    			attr_dev(div4, "class", "move-item svelte-1awno4m");
    			toggle_class(div4, "is-fast", /*mdata*/ ctx[0].isFast);
    			toggle_class(div4, "is-charged", !/*mdata*/ ctx[0].isFast);
    			toggle_class(div4, "is-legacy", /*mdata*/ ctx[0].isLegacy);
    			toggle_class(div4, "is-stab", /*mdata*/ ctx[0].stab);
    			add_location(div4, file$1, 6, 0, 42);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, t1);
    			append_dev(div4, t2);
    			if_block.m(div4, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*mdata*/ 1 && div0_data_type_value !== (div0_data_type_value = /*mdata*/ ctx[0].type)) {
    				attr_dev(div0, "data-type", div0_data_type_value);
    			}

    			if (dirty & /*mdata*/ 1 && t1_value !== (t1_value = /*mdata*/ ctx[0].name + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*mdata*/ 1 && div3_title_value !== (div3_title_value = /*mdata*/ ctx[0].moveId)) {
    				attr_dev(div3, "title", div3_title_value);
    			}

    			if (dirty & /*mdata*/ 1 && div3_data_title_value !== (div3_data_title_value = /*mdata*/ ctx[0].moveId)) {
    				attr_dev(div3, "data-title", div3_data_title_value);
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div4, null);
    				}
    			}

    			if (dirty & /*mdata*/ 1) {
    				toggle_class(div4, "is-fast", /*mdata*/ ctx[0].isFast);
    			}

    			if (dirty & /*mdata*/ 1) {
    				toggle_class(div4, "is-charged", !/*mdata*/ ctx[0].isFast);
    			}

    			if (dirty & /*mdata*/ 1) {
    				toggle_class(div4, "is-legacy", /*mdata*/ ctx[0].isLegacy);
    			}

    			if (dirty & /*mdata*/ 1) {
    				toggle_class(div4, "is-stab", /*mdata*/ ctx[0].stab);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { mdata } = $$props;
    	const writable_props = ["mdata"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Move> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("mdata" in $$props) $$invalidate(0, mdata = $$props.mdata);
    	};

    	$$self.$capture_state = () => {
    		return { mdata };
    	};

    	$$self.$inject_state = $$props => {
    		if ("mdata" in $$props) $$invalidate(0, mdata = $$props.mdata);
    	};

    	return [mdata];
    }

    class Move extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { mdata: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Move",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*mdata*/ ctx[0] === undefined && !("mdata" in props)) {
    			console.warn("<Move> was created without expected prop 'mdata'");
    		}
    	}

    	get mdata() {
    		throw new Error("<Move>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mdata(value) {
    		throw new Error("<Move>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/TTFA.html generated by Svelte v3.17.1 */

    const { console: console_1 } = globals;
    const file$2 = "src/TTFA.html";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[14] = i;
    	return child_ctx;
    }

    // (134:10) {#each ths as th, index (th.title)}
    function create_each_block_1(key_1, ctx) {
    	let div;
    	let t0_value = /*th*/ ctx[12].title + "";
    	let t0;
    	let t1;
    	let div_data_order_value;
    	let div_data_dir_value;
    	let dispose;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(div, "class", "td th svelte-1k083f");
    			attr_dev(div, "data-order", div_data_order_value = /*th*/ ctx[12].order);

    			attr_dev(div, "data-dir", div_data_dir_value = /*th*/ ctx[12].dir
    			? /*th*/ ctx[12].dir > 0 ? "▲" : "▼"
    			: null);

    			toggle_class(div, "mname", !/*th*/ ctx[12].value);
    			toggle_class(div, "sort-th", /*th*/ ctx[12].value);
    			add_location(div, file$2, 134, 12, 2396);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);

    			dispose = listen_dev(
    				div,
    				"click",
    				function () {
    					if (is_function(/*updateSortTypes*/ ctx[2](/*th*/ ctx[12].value))) /*updateSortTypes*/ ctx[2](/*th*/ ctx[12].value).apply(this, arguments);
    				},
    				false,
    				false,
    				false
    			);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*ths*/ 2 && t0_value !== (t0_value = /*th*/ ctx[12].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*ths*/ 2 && div_data_order_value !== (div_data_order_value = /*th*/ ctx[12].order)) {
    				attr_dev(div, "data-order", div_data_order_value);
    			}

    			if (dirty & /*ths*/ 2 && div_data_dir_value !== (div_data_dir_value = /*th*/ ctx[12].dir
    			? /*th*/ ctx[12].dir > 0 ? "▲" : "▼"
    			: null)) {
    				attr_dev(div, "data-dir", div_data_dir_value);
    			}

    			if (dirty & /*ths*/ 2) {
    				toggle_class(div, "mname", !/*th*/ ctx[12].value);
    			}

    			if (dirty & /*ths*/ 2) {
    				toggle_class(div, "sort-th", /*th*/ ctx[12].value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(134:10) {#each ths as th, index (th.title)}",
    		ctx
    	});

    	return block;
    }

    // (151:8) {#each pairs as pair}
    function create_each_block(ctx) {
    	let div6;
    	let div0;
    	let t0_value = /*pair*/ ctx[9].turns + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = /*pair*/ ctx[9].hits + "";
    	let t2;
    	let t3;
    	let div2;
    	let raw0_value = tNum(/*pair*/ ctx[9].dmg_t) + "";
    	let t4;
    	let div3;
    	let raw1_value = tNum(/*pair*/ ctx[9].dpt) + "";
    	let t5;
    	let div4;
    	let t6_value = /*pair*/ ctx[9].f.name + "";
    	let t6;
    	let div4_title_value;
    	let t7;
    	let div5;
    	let t8_value = /*pair*/ ctx[9].c.name + "";
    	let t8;
    	let t9;

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = space();
    			div3 = element("div");
    			t5 = space();
    			div4 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div5 = element("div");
    			t8 = text(t8_value);
    			t9 = space();
    			attr_dev(div0, "class", "td svelte-1k083f");
    			add_location(div0, file$2, 152, 12, 2868);
    			attr_dev(div1, "class", "td svelte-1k083f");
    			add_location(div1, file$2, 153, 12, 2915);
    			attr_dev(div2, "class", "td svelte-1k083f");
    			add_location(div2, file$2, 155, 12, 3029);
    			attr_dev(div3, "class", "td svelte-1k083f");
    			add_location(div3, file$2, 156, 12, 3088);
    			attr_dev(div4, "class", "td mname svelte-1k083f");
    			attr_dev(div4, "title", div4_title_value = /*pair*/ ctx[9].f);
    			add_location(div4, file$2, 157, 12, 3145);
    			attr_dev(div5, "class", "td mname svelte-1k083f");
    			add_location(div5, file$2, 158, 12, 3214);
    			attr_dev(div6, "class", "tr svelte-1k083f");
    			add_location(div6, file$2, 151, 10, 2839);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div0);
    			append_dev(div0, t0);
    			append_dev(div6, t1);
    			append_dev(div6, div1);
    			append_dev(div1, t2);
    			append_dev(div6, t3);
    			append_dev(div6, div2);
    			div2.innerHTML = raw0_value;
    			append_dev(div6, t4);
    			append_dev(div6, div3);
    			div3.innerHTML = raw1_value;
    			append_dev(div6, t5);
    			append_dev(div6, div4);
    			append_dev(div4, t6);
    			append_dev(div6, t7);
    			append_dev(div6, div5);
    			append_dev(div5, t8);
    			append_dev(div6, t9);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pairs*/ 1 && t0_value !== (t0_value = /*pair*/ ctx[9].turns + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*pairs*/ 1 && t2_value !== (t2_value = /*pair*/ ctx[9].hits + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*pairs*/ 1 && raw0_value !== (raw0_value = tNum(/*pair*/ ctx[9].dmg_t) + "")) div2.innerHTML = raw0_value;			if (dirty & /*pairs*/ 1 && raw1_value !== (raw1_value = tNum(/*pair*/ ctx[9].dpt) + "")) div3.innerHTML = raw1_value;			if (dirty & /*pairs*/ 1 && t6_value !== (t6_value = /*pair*/ ctx[9].f.name + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*pairs*/ 1 && div4_title_value !== (div4_title_value = /*pair*/ ctx[9].f)) {
    				attr_dev(div4, "title", div4_title_value);
    			}

    			if (dirty & /*pairs*/ 1 && t8_value !== (t8_value = /*pair*/ ctx[9].c.name + "")) set_data_dev(t8, t8_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(151:8) {#each pairs as pair}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let div2;
    	let details;
    	let summary;
    	let h3;
    	let t1;
    	let div1;
    	let div0;
    	let each_blocks_1 = [];
    	let each0_lookup = new Map();
    	let t2;
    	let each_value_1 = /*ths*/ ctx[1];
    	const get_key = ctx => /*th*/ ctx[12].title;

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each0_lookup.set(key, each_blocks_1[i] = create_each_block_1(key, child_ctx));
    	}

    	let each_value = /*pairs*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			div2 = element("div");
    			details = element("details");
    			summary = element("summary");
    			h3 = element("h3");
    			h3.textContent = "Move Pairs";
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h3, "class", "d-ib");
    			add_location(h3, file$2, 129, 15, 2232);
    			add_location(summary, file$2, 129, 6, 2223);
    			attr_dev(div0, "class", "tr thead svelte-1k083f");
    			add_location(div0, file$2, 132, 8, 2315);
    			attr_dev(div1, "class", "move-pairs svelte-1k083f");
    			add_location(div1, file$2, 131, 6, 2282);
    			details.open = true;
    			add_location(details, file$2, 128, 4, 2202);
    			attr_dev(div2, "class", "card");
    			add_location(div2, file$2, 127, 2, 2179);
    			attr_dev(section, "class", "pairs-section");
    			add_location(section, file$2, 126, 0, 2145);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, details);
    			append_dev(details, summary);
    			append_dev(summary, h3);
    			append_dev(details, t1);
    			append_dev(details, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(div1, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const each_value_1 = /*ths*/ ctx[1];
    			each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, each_value_1, each0_lookup, div0, destroy_block, create_each_block_1, null, get_each_context_1);

    			if (dirty & /*pairs, tNum*/ 1) {
    				each_value = /*pairs*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].d();
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function tNum(num, d = 1) {
    	let n = fixNum(num, d, true).split(".");
    	n[1] = `<small class="decimal">.${n[1]}</small>`;
    	return n.join("");
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { mdata } = $$props;
    	let pairs;
    	let sortTypes = [["turns", 1], ["dmg_t", -1]];

    	let o_ths = [
    		{ title: "t", value: "turns" },
    		{ title: "H", value: "hits" },
    		{ title: "Σdmg", value: "dmg_t" },
    		{ title: "DPT", value: "dpt" },
    		{ title: "f.name" },
    		{ title: "c.name" }
    	];

    	let ths;

    	function genPairs() {
    		for (let f of mdata[0].data) {
    			for (let c of mdata[1].data) {
    				let hits = Math.ceil(c.energy / f.energyGain);
    				let turns = hits * f.turn;
    				let dmg_f = f.power * hits * f.stabFactor;
    				let dmg_t = dmg_f + c.power * c.stabFactor;
    				let dpt = dmg_t / turns;
    				$$invalidate(0, pairs = pairs.concat({ f, c, turns, hits, dmg_f, dmg_t, dpt }));
    			}
    		}
    	}

    	

    	function sortPair(a, b) {
    		let [[st1, st1d], [st2, st2d]] = sortTypes;

    		if (a[st1] > b[st1]) {
    			return st1d;
    		}

    		if (a[st1] < b[st1]) {
    			return -st1d;
    		}

    		return a[st2] > b[st2] ? st2d : -st2d;
    	}

    	function genTHs() {
    		return copy(o_ths).map(th => {
    			if (!th.value) {
    				return th;
    			}

    			let sortIndex = sortTypes.findIndex(t => t[0] === th.value);

    			if (sortIndex === -1) {
    				return th;
    			}

    			th.dir = sortTypes[sortIndex][1];
    			th.order = sortIndex + 1;
    			return th;
    		});
    	}

    	let updateSortTypes = type => e => {
    		if (!type) {
    			return;
    		}

    		let idx = sortTypes.findIndex(t => t[0] === type);

    		if (idx === -1) {
    			sortTypes.push([type, 1]);
    			$$invalidate(4, sortTypes = sortTypes.slice(-2));
    		} else {
    			$$invalidate(4, sortTypes[idx][1] = sortTypes[idx][1] * -1, sortTypes);
    		}
    	};

    	const writable_props = ["mdata"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<TTFA> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("mdata" in $$props) $$invalidate(3, mdata = $$props.mdata);
    	};

    	$$self.$capture_state = () => {
    		return {
    			mdata,
    			pairs,
    			sortTypes,
    			o_ths,
    			ths,
    			updateSortTypes
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("mdata" in $$props) $$invalidate(3, mdata = $$props.mdata);
    		if ("pairs" in $$props) $$invalidate(0, pairs = $$props.pairs);
    		if ("sortTypes" in $$props) $$invalidate(4, sortTypes = $$props.sortTypes);
    		if ("o_ths" in $$props) o_ths = $$props.o_ths;
    		if ("ths" in $$props) $$invalidate(1, ths = $$props.ths);
    		if ("updateSortTypes" in $$props) $$invalidate(2, updateSortTypes = $$props.updateSortTypes);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*mdata, sortTypes, pairs*/ 25) {
    			 {
    				$$invalidate(0, pairs = []);
    				console.log("ttfa", mdata, pairs);
    				genPairs();
    				$$invalidate(0, pairs = pairs.sort(sortPair));
    				$$invalidate(1, ths = genTHs());
    				console.log("ttfa", mdata, pairs);
    			}
    		}
    	};

    	return [pairs, ths, updateSortTypes, mdata];
    }

    class TTFA extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { mdata: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TTFA",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*mdata*/ ctx[3] === undefined && !("mdata" in props)) {
    			console_1.warn("<TTFA> was created without expected prop 'mdata'");
    		}
    	}

    	get mdata() {
    		throw new Error("<TTFA>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mdata(value) {
    		throw new Error("<TTFA>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Moveset.html generated by Svelte v3.17.1 */
    const file$3 = "src/Moveset.html";

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (61:10) {#each mmm.data as m }
    function create_each_block_1$1(ctx) {
    	let current;

    	const move = new Move({
    			props: { mdata: /*m*/ ctx[9] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(move.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(move, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const move_changes = {};
    			if (dirty & /*mdata*/ 1) move_changes.mdata = /*m*/ ctx[9];
    			move.$set(move_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(move.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(move.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(move, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(61:10) {#each mmm.data as m }",
    		ctx
    	});

    	return block;
    }

    // (56:2) {#each mdata as mmm}
    function create_each_block$1(ctx) {
    	let div1;
    	let details;
    	let summary;
    	let h3;
    	let t0_value = /*mmm*/ ctx[6].title + "";
    	let t0;
    	let t1;
    	let div0;
    	let t2;
    	let current;
    	let each_value_1 = /*mmm*/ ctx[6].data;
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			details = element("details");
    			summary = element("summary");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			attr_dev(h3, "class", "moveset-title d-ib");
    			add_location(h3, file$3, 58, 17, 1246);
    			add_location(summary, file$3, 58, 8, 1237);
    			attr_dev(div0, "class", "moveset svelte-1ksp2fv");
    			add_location(div0, file$3, 59, 8, 1312);
    			details.open = true;
    			add_location(details, file$3, 57, 6, 1214);
    			attr_dev(div1, "class", "card");
    			add_location(div1, file$3, 56, 4, 1189);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, details);
    			append_dev(details, summary);
    			append_dev(summary, h3);
    			append_dev(h3, t0);
    			append_dev(details, t1);
    			append_dev(details, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t2);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*mdata*/ 1) && t0_value !== (t0_value = /*mmm*/ ctx[6].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*mdata*/ 1) {
    				each_value_1 = /*mmm*/ ctx[6].data;
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(56:2) {#each mdata as mmm}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let section;
    	let t;
    	let current;
    	let each_value = /*mdata*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const ttfa = new TTFA({
    			props: { mdata: /*mdata*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			create_component(ttfa.$$.fragment);
    			attr_dev(section, "class", "moves");
    			add_location(section, file$3, 54, 0, 1138);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}

    			insert_dev(target, t, anchor);
    			mount_component(ttfa, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*mdata*/ 1) {
    				each_value = /*mdata*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(section, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			const ttfa_changes = {};
    			if (dirty & /*mdata*/ 1) ttfa_changes.mdata = /*mdata*/ ctx[0];
    			ttfa.$set(ttfa_changes);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(ttfa.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(ttfa.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(ttfa, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $moves;
    	validate_store(moves, "moves");
    	component_subscribe($$self, moves, $$value => $$invalidate(2, $moves = $$value));
    	let { pm } = $$props;

    	function queryMove(mname) {
    		return copy($moves.find(m => m.moveId === mname));
    	}

    	function genMove(mname, isFast) {
    		let mmm = queryMove(mname);
    		mmm.isLegacy = lmoves && lmoves.includes(mname);
    		mmm.isFast = isFast;
    		mmm.stab = pm.types.includes(mmm.type);
    		mmm.stabFactor = mmm.stab ? 1.2 : 1;

    		if (isFast) {
    			mmm.ept = fixNum(mmm.energyGain / mmm.turn);
    			mmm.dpt = fixNum(mmm.power / mmm.turn);
    			mmm.eptxdpt = fixNum(mmm.ept * mmm.dpt);
    		} else {
    			mmm.dpe = fixNum(mmm.power / mmm.energy);

    			if (mmm.buffs) {
    				mmm.buffsDes = introEffect(mmm);
    			}
    		}

    		return mmm;
    	}

    	let lmoves = pm.legacyMoves;
    	let mdata;
    	const writable_props = ["pm"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Moveset> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("pm" in $$props) $$invalidate(1, pm = $$props.pm);
    	};

    	$$self.$capture_state = () => {
    		return { pm, lmoves, mdata, $moves };
    	};

    	$$self.$inject_state = $$props => {
    		if ("pm" in $$props) $$invalidate(1, pm = $$props.pm);
    		if ("lmoves" in $$props) lmoves = $$props.lmoves;
    		if ("mdata" in $$props) $$invalidate(0, mdata = $$props.mdata);
    		if ("$moves" in $$props) moves.set($moves = $$props.$moves);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*pm*/ 2) {
    			 {
    				$$invalidate(0, mdata = [
    					{
    						title: "Fast Moves",
    						data: pm.fastMoves.map(m => genMove(m, true))
    					},
    					{
    						title: "Charged Moves",
    						data: pm.chargedMoves.map(m => genMove(m, false))
    					}
    				]);
    			}
    		}
    	};

    	return [mdata, pm];
    }

    class Moveset extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { pm: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Moveset",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*pm*/ ctx[1] === undefined && !("pm" in props)) {
    			console.warn("<Moveset> was created without expected prop 'pm'");
    		}
    	}

    	get pm() {
    		throw new Error("<Moveset>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pm(value) {
    		throw new Error("<Moveset>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/CP.html generated by Svelte v3.17.1 */
    const file$4 = "src/CP.html";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (40:4) {#each cps as cp }
    function create_each_block$2(ctx) {
    	let tr;
    	let th;
    	let t0;
    	let t1_value = /*cp*/ ctx[2].lv + "";
    	let t1;
    	let t2;
    	let td0;
    	let t3_value = /*cp*/ ctx[2].ooo + "";
    	let t3;
    	let t4;
    	let td1;

    	let t5_value = (/*cp*/ ctx[2].ooo !== /*cp*/ ctx[2].min
    	? /*cp*/ ctx[2].min
    	: "") + "";

    	let t5;
    	let t6;
    	let td2;
    	let t7_value = /*cp*/ ctx[2].ccc + "";
    	let t7;
    	let t8;
    	let td3;
    	let t9_value = /*cp*/ ctx[2].wow + "";
    	let t9;
    	let t10;
    	let td4;
    	let t11_value = /*cp*/ ctx[2].max + "";
    	let t11;
    	let t12;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			th = element("th");
    			t0 = text("Lv");
    			t1 = text(t1_value);
    			t2 = space();
    			td0 = element("td");
    			t3 = text(t3_value);
    			t4 = space();
    			td1 = element("td");
    			t5 = text(t5_value);
    			t6 = space();
    			td2 = element("td");
    			t7 = text(t7_value);
    			t8 = space();
    			td3 = element("td");
    			t9 = text(t9_value);
    			t10 = space();
    			td4 = element("td");
    			t11 = text(t11_value);
    			t12 = space();
    			attr_dev(th, "class", "svelte-1pd7psn");
    			add_location(th, file$4, 41, 8, 875);
    			attr_dev(td0, "class", "svelte-1pd7psn");
    			add_location(td0, file$4, 42, 8, 902);
    			attr_dev(td1, "class", "svelte-1pd7psn");
    			add_location(td1, file$4, 43, 8, 928);
    			attr_dev(td2, "class", "svelte-1pd7psn");
    			add_location(td2, file$4, 44, 8, 979);
    			attr_dev(td3, "class", "svelte-1pd7psn");
    			add_location(td3, file$4, 45, 8, 1005);
    			attr_dev(td4, "class", "svelte-1pd7psn");
    			add_location(td4, file$4, 46, 8, 1031);
    			add_location(tr, file$4, 40, 6, 862);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, th);
    			append_dev(th, t0);
    			append_dev(th, t1);
    			append_dev(tr, t2);
    			append_dev(tr, td0);
    			append_dev(td0, t3);
    			append_dev(tr, t4);
    			append_dev(tr, td1);
    			append_dev(td1, t5);
    			append_dev(tr, t6);
    			append_dev(tr, td2);
    			append_dev(td2, t7);
    			append_dev(tr, t8);
    			append_dev(tr, td3);
    			append_dev(td3, t9);
    			append_dev(tr, t10);
    			append_dev(tr, td4);
    			append_dev(td4, t11);
    			append_dev(tr, t12);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(40:4) {#each cps as cp }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let table;
    	let thead;
    	let tr;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let th3;
    	let t7;
    	let th4;
    	let t9;
    	let th5;
    	let t11;
    	let tbody;
    	let each_value = /*cps*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "IV / CP";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "0-0-0";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "4-4-4";
    			t5 = space();
    			th3 = element("th");
    			th3.textContent = "13-13-13";
    			t7 = space();
    			th4 = element("th");
    			th4.textContent = "☆☆☆☆";
    			t9 = space();
    			th5 = element("th");
    			th5.textContent = "15-15-15";
    			t11 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(th0, "class", "svelte-1pd7psn");
    			add_location(th0, file$4, 30, 6, 600);
    			attr_dev(th1, "class", "svelte-1pd7psn");
    			add_location(th1, file$4, 31, 6, 623);
    			attr_dev(th2, "class", "svelte-1pd7psn");
    			add_location(th2, file$4, 32, 6, 644);
    			attr_dev(th3, "title", "might be 100% after purified");
    			attr_dev(th3, "class", "svelte-1pd7psn");
    			add_location(th3, file$4, 33, 6, 665);
    			attr_dev(th4, "title", "should be 100% after purified");
    			attr_dev(th4, "class", "svelte-1pd7psn");
    			add_location(th4, file$4, 34, 6, 726);
    			attr_dev(th5, "class", "svelte-1pd7psn");
    			add_location(th5, file$4, 35, 6, 784);
    			add_location(tr, file$4, 29, 4, 589);
    			add_location(thead, file$4, 28, 2, 577);
    			add_location(tbody, file$4, 38, 2, 825);
    			attr_dev(table, "class", "pm-cp svelte-1pd7psn");
    			add_location(table, file$4, 27, 0, 553);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t1);
    			append_dev(tr, th1);
    			append_dev(tr, t3);
    			append_dev(tr, th2);
    			append_dev(tr, t5);
    			append_dev(tr, th3);
    			append_dev(tr, t7);
    			append_dev(tr, th4);
    			append_dev(tr, t9);
    			append_dev(tr, th5);
    			append_dev(table, t11);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*cps*/ 1) {
    				each_value = /*cps*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { ads } = $$props;

    	let cps = [
    		{
    			lv: 8,
    			ooo: calPmCP(ads, [0, 0, 0, 8]),
    			min: calPmCP(ads, [0, 0, 0, 8]),
    			ccc: calPmCP(ads, [13, 13, 13, 8]),
    			max: calPmCP(ads, [15, 15, 15, 8]),
    			wow: calPmWOWCP(ads, 8)
    		},
    		{
    			lv: 13,
    			ooo: calPmCP(ads, [0, 0, 0, 13]),
    			min: calPmCP(ads, [4, 4, 4, 13]),
    			ccc: calPmCP(ads, [13, 13, 13, 13]),
    			max: calPmCP(ads, [15, 15, 15, 13]),
    			wow: calPmWOWCP(ads, 13)
    		}
    	];

    	const writable_props = ["ads"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CP> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("ads" in $$props) $$invalidate(1, ads = $$props.ads);
    	};

    	$$self.$capture_state = () => {
    		return { ads, cps };
    	};

    	$$self.$inject_state = $$props => {
    		if ("ads" in $$props) $$invalidate(1, ads = $$props.ads);
    		if ("cps" in $$props) $$invalidate(0, cps = $$props.cps);
    	};

    	return [cps, ads];
    }

    class CP extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { ads: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CP",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*ads*/ ctx[1] === undefined && !("ads" in props)) {
    			console.warn("<CP> was created without expected prop 'ads'");
    		}
    	}

    	get ads() {
    		throw new Error("<CP>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ads(value) {
    		throw new Error("<CP>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/PM.html generated by Svelte v3.17.1 */
    const file$5 = "src/PM.html";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (13:0) {#if pm}
    function create_if_block$1(ctx) {
    	let section;
    	let header;
    	let div5;
    	let span;
    	let t0_value = /*pm*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let small;
    	let t2;
    	let t3_value = /*pm*/ ctx[0].dex + "";
    	let t3;
    	let t4;
    	let div0;
    	let t5;
    	let div4;
    	let div1;
    	let t6_value = /*pm*/ ctx[0].baseStats.atk + "";
    	let t6;
    	let t7;
    	let div2;
    	let t8_value = /*pm*/ ctx[0].baseStats.def + "";
    	let t8;
    	let t9;
    	let div3;
    	let t10_value = /*pm*/ ctx[0].baseStats.sta + "";
    	let t10;
    	let t11;
    	let div6;
    	let t12;
    	let current;
    	let each_value = /*pm*/ ctx[0].types;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const cp = new CP({
    			props: { ads: /*pm*/ ctx[0].baseStats },
    			$$inline: true
    		});

    	const moveset = new Moveset({
    			props: { pm: /*pm*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			div5 = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			small = element("small");
    			t2 = text("#");
    			t3 = text(t3_value);
    			t4 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			div4 = element("div");
    			div1 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div2 = element("div");
    			t8 = text(t8_value);
    			t9 = space();
    			div3 = element("div");
    			t10 = text(t10_value);
    			t11 = space();
    			div6 = element("div");
    			create_component(cp.$$.fragment);
    			t12 = space();
    			create_component(moveset.$$.fragment);
    			attr_dev(span, "class", "pm-name svelte-m8vw33");
    			add_location(span, file$5, 16, 8, 355);
    			attr_dev(small, "class", "pm-dex svelte-m8vw33");
    			add_location(small, file$5, 17, 8, 402);
    			attr_dev(div0, "class", "pm-types df");
    			add_location(div0, file$5, 19, 8, 451);
    			attr_dev(div1, "class", "base svelte-m8vw33");
    			attr_dev(div1, "data-base", "a");
    			add_location(div1, file$5, 26, 10, 667);
    			attr_dev(div2, "class", "base svelte-m8vw33");
    			attr_dev(div2, "data-base", "d");
    			add_location(div2, file$5, 27, 10, 734);
    			attr_dev(div3, "class", "base svelte-m8vw33");
    			attr_dev(div3, "data-base", "s");
    			add_location(div3, file$5, 28, 10, 801);
    			attr_dev(div4, "class", "pm-stats svelte-m8vw33");
    			add_location(div4, file$5, 25, 8, 634);
    			attr_dev(div5, "class", "df mb-4 mt-4");
    			add_location(div5, file$5, 15, 6, 320);
    			attr_dev(div6, "class", "mb-5");
    			add_location(div6, file$5, 32, 6, 893);
    			attr_dev(header, "class", "pm-info card svelte-m8vw33");
    			add_location(header, file$5, 14, 4, 284);
    			attr_dev(section, "class", "pm-section L1-box");
    			add_location(section, file$5, 13, 2, 244);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			append_dev(header, div5);
    			append_dev(div5, span);
    			append_dev(span, t0);
    			append_dev(div5, t1);
    			append_dev(div5, small);
    			append_dev(small, t2);
    			append_dev(small, t3);
    			append_dev(div5, t4);
    			append_dev(div5, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, t6);
    			append_dev(div4, t7);
    			append_dev(div4, div2);
    			append_dev(div2, t8);
    			append_dev(div4, t9);
    			append_dev(div4, div3);
    			append_dev(div3, t10);
    			append_dev(header, t11);
    			append_dev(header, div6);
    			mount_component(cp, div6, null);
    			append_dev(section, t12);
    			mount_component(moveset, section, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*pm*/ 1) && t0_value !== (t0_value = /*pm*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*pm*/ 1) && t3_value !== (t3_value = /*pm*/ ctx[0].dex + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*pm*/ 1) {
    				each_value = /*pm*/ ctx[0].types;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if ((!current || dirty & /*pm*/ 1) && t6_value !== (t6_value = /*pm*/ ctx[0].baseStats.atk + "")) set_data_dev(t6, t6_value);
    			if ((!current || dirty & /*pm*/ 1) && t8_value !== (t8_value = /*pm*/ ctx[0].baseStats.def + "")) set_data_dev(t8, t8_value);
    			if ((!current || dirty & /*pm*/ 1) && t10_value !== (t10_value = /*pm*/ ctx[0].baseStats.sta + "")) set_data_dev(t10, t10_value);
    			const cp_changes = {};
    			if (dirty & /*pm*/ 1) cp_changes.ads = /*pm*/ ctx[0].baseStats;
    			cp.$set(cp_changes);
    			const moveset_changes = {};
    			if (dirty & /*pm*/ 1) moveset_changes.pm = /*pm*/ ctx[0];
    			moveset.$set(moveset_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cp.$$.fragment, local);
    			transition_in(moveset.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cp.$$.fragment, local);
    			transition_out(moveset.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			destroy_component(cp);
    			destroy_component(moveset);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(13:0) {#if pm}",
    		ctx
    	});

    	return block;
    }

    // (21:10) {#each pm.types as type}
    function create_each_block$3(ctx) {
    	let div;
    	let div_data_type_value;
    	let div_title_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "pm-type type-icon svelte-m8vw33");
    			attr_dev(div, "data-type", div_data_type_value = /*type*/ ctx[3]);
    			attr_dev(div, "title", div_title_value = /*type*/ ctx[3]);
    			add_location(div, file$5, 21, 12, 524);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pm*/ 1 && div_data_type_value !== (div_data_type_value = /*type*/ ctx[3])) {
    				attr_dev(div, "data-type", div_data_type_value);
    			}

    			if (dirty & /*pm*/ 1 && div_title_value !== (div_title_value = /*type*/ ctx[3])) {
    				attr_dev(div, "title", div_title_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(21:10) {#each pm.types as type}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*pm*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*pm*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $pokemon;
    	let $dex;
    	validate_store(pokemon, "pokemon");
    	component_subscribe($$self, pokemon, $$value => $$invalidate(1, $pokemon = $$value));
    	validate_store(dex, "dex");
    	component_subscribe($$self, dex, $$value => $$invalidate(2, $dex = $$value));

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("pm" in $$props) $$invalidate(0, pm = $$props.pm);
    		if ("$pokemon" in $$props) pokemon.set($pokemon = $$props.$pokemon);
    		if ("$dex" in $$props) dex.set($dex = $$props.$dex);
    	};

    	let pm;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$pokemon, $dex*/ 6) {
    			 $$invalidate(0, pm = $pokemon.find(pm => pm.dex === +$dex));
    		}
    	};

    	return [pm];
    }

    class PM extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PM",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/History.html generated by Svelte v3.17.1 */
    const file$6 = "src/History.html";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (37:8) {#each footprints as footprint (footprint.dex)}
    function create_each_block$4(key_1, ctx) {
    	let a;
    	let t0_value = /*footprint*/ ctx[7].title + "";
    	let t0;
    	let t1;
    	let a_href_value;
    	let a_data_dex_value;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "class", "mb-1");
    			attr_dev(a, "href", a_href_value = "./?dex=" + /*footprint*/ ctx[7].dex);
    			attr_dev(a, "data-dex", a_data_dex_value = /*footprint*/ ctx[7].dex);
    			add_location(a, file$6, 37, 10, 810);
    			this.first = a;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t0);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*footprints*/ 1 && t0_value !== (t0_value = /*footprint*/ ctx[7].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*footprints*/ 1 && a_href_value !== (a_href_value = "./?dex=" + /*footprint*/ ctx[7].dex)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*footprints*/ 1 && a_data_dex_value !== (a_data_dex_value = /*footprint*/ ctx[7].dex)) {
    				attr_dev(a, "data-dex", a_data_dex_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(37:8) {#each footprints as footprint (footprint.dex)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div2;
    	let details;
    	let summary;
    	let h3;
    	let t1;
    	let div1;
    	let div0;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t2;
    	let hr;
    	let t3;
    	let a;
    	let t4;
    	let a_href_value;
    	let dispose;
    	let each_value = /*footprints*/ ctx[0];
    	const get_key = ctx => /*footprint*/ ctx[7].dex;

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$4(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$4(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			details = element("details");
    			summary = element("summary");
    			h3 = element("h3");
    			h3.textContent = "History";
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			hr = element("hr");
    			t3 = space();
    			a = element("a");
    			t4 = text("Share 🔗");
    			attr_dev(h3, "class", "d-ib");
    			add_location(h3, file$6, 33, 13, 627);
    			add_location(summary, file$6, 33, 4, 618);
    			attr_dev(div0, "class", "df fd-c fd-cr");
    			add_location(div0, file$6, 35, 6, 683);
    			add_location(hr, file$6, 46, 6, 998);
    			attr_dev(a, "href", a_href_value = "./?" + /*shareLink*/ ctx[1]);
    			set_style(a, "margin-left", "5em");
    			add_location(a, file$6, 47, 6, 1009);
    			add_location(div1, file$6, 34, 4, 671);
    			details.open = true;
    			add_location(details, file$6, 32, 2, 599);
    			attr_dev(div2, "class", "card history svelte-4e4l9n");
    			add_location(div2, file$6, 31, 0, 570);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, details);
    			append_dev(details, summary);
    			append_dev(summary, h3);
    			append_dev(details, t1);
    			append_dev(details, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t2);
    			append_dev(div1, hr);
    			append_dev(div1, t3);
    			append_dev(div1, a);
    			append_dev(a, t4);
    			dispose = listen_dev(div0, "click", prevent_default(/*setDex*/ ctx[2]), false, true, false);
    		},
    		p: function update(ctx, [dirty]) {
    			const each_value = /*footprints*/ ctx[0];
    			each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div0, destroy_block, create_each_block$4, null, get_each_context$4);

    			if (dirty & /*shareLink*/ 2 && a_href_value !== (a_href_value = "./?" + /*shareLink*/ ctx[1])) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $pokemon;
    	let $queryHistory;
    	let $dex;
    	validate_store(pokemon, "pokemon");
    	component_subscribe($$self, pokemon, $$value => $$invalidate(3, $pokemon = $$value));
    	validate_store(queryHistory, "queryHistory");
    	component_subscribe($$self, queryHistory, $$value => $$invalidate(4, $queryHistory = $$value));
    	validate_store(dex, "dex");
    	component_subscribe($$self, dex, $$value => $$invalidate(5, $dex = $$value));
    	let footprints = [];
    	let shareLink = "";

    	function setDex(e) {
    		if (!e.target.href) {
    			return;
    		}

    		set_store_value(dex, $dex = +e.target.dataset.dex);
    	}

    	function getTitle(dex) {
    		let _pm = $pokemon.find(pm => pm.dex === dex);
    		return `#${dex} ${_pm && _pm.name || "-"}`;
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("footprints" in $$props) $$invalidate(0, footprints = $$props.footprints);
    		if ("shareLink" in $$props) $$invalidate(1, shareLink = $$props.shareLink);
    		if ("$pokemon" in $$props) pokemon.set($pokemon = $$props.$pokemon);
    		if ("$queryHistory" in $$props) queryHistory.set($queryHistory = $$props.$queryHistory);
    		if ("$dex" in $$props) dex.set($dex = $$props.$dex);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$pokemon, $queryHistory*/ 24) {
    			 {

    				$$invalidate(0, footprints = $queryHistory.map(q => {
    					return { dex: q, title: getTitle(q) };
    				}));

    				$$invalidate(1, shareLink = $queryHistory.map(n => `dex=${n}`).reverse().join("&"));
    			}
    		}
    	};

    	return [footprints, shareLink, setDex];
    }

    class History extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "History",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Settings.html generated by Svelte v3.17.1 */
    const file$7 = "src/Settings.html";

    function create_fragment$7(ctx) {
    	let div2;
    	let label0;
    	let t0;
    	let input0;
    	let t1;
    	let div0;
    	let t2;
    	let t3;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let div1;
    	let t6;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			label0 = element("label");
    			t0 = text("List\n    ");
    			input0 = element("input");
    			t1 = space();
    			div0 = element("div");
    			t2 = text("\n    Grid");
    			t3 = space();
    			label1 = element("label");
    			t4 = text("Light\n    ");
    			input1 = element("input");
    			t5 = space();
    			div1 = element("div");
    			t6 = text("\n    Dark");
    			attr_dev(input0, "class", "switcher-checkbox");
    			attr_dev(input0, "type", "checkbox");
    			add_location(input0, file$7, 9, 4, 159);
    			attr_dev(div0, "class", "switcher-icon");
    			add_location(div0, file$7, 10, 4, 238);
    			attr_dev(label0, "class", "gridview-switcher switcher mb-2");
    			add_location(label0, file$7, 7, 2, 98);
    			attr_dev(input1, "class", "switcher-checkbox");
    			attr_dev(input1, "type", "checkbox");
    			add_location(input1, file$7, 16, 4, 358);
    			attr_dev(div1, "class", "switcher-icon");
    			add_location(div1, file$7, 17, 4, 438);
    			attr_dev(label1, "class", "darktheme-switcher switcher mb-2");
    			add_location(label1, file$7, 14, 2, 295);
    			attr_dev(div2, "class", "settings svelte-ciyq2s");
    			add_location(div2, file$7, 6, 0, 73);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, label0);
    			append_dev(label0, t0);
    			append_dev(label0, input0);
    			input0.checked = /*$gridview*/ ctx[0];
    			append_dev(label0, t1);
    			append_dev(label0, div0);
    			append_dev(label0, t2);
    			append_dev(div2, t3);
    			append_dev(div2, label1);
    			append_dev(label1, t4);
    			append_dev(label1, input1);
    			input1.checked = /*$darktheme*/ ctx[1];
    			append_dev(label1, t5);
    			append_dev(label1, div1);
    			append_dev(label1, t6);

    			dispose = [
    				listen_dev(input0, "change", /*input0_change_handler*/ ctx[2]),
    				listen_dev(input1, "change", /*input1_change_handler*/ ctx[3])
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$gridview*/ 1) {
    				input0.checked = /*$gridview*/ ctx[0];
    			}

    			if (dirty & /*$darktheme*/ 2) {
    				input1.checked = /*$darktheme*/ ctx[1];
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $gridview;
    	let $darktheme;
    	validate_store(gridview, "gridview");
    	component_subscribe($$self, gridview, $$value => $$invalidate(0, $gridview = $$value));
    	validate_store(darktheme, "darktheme");
    	component_subscribe($$self, darktheme, $$value => $$invalidate(1, $darktheme = $$value));

    	function input0_change_handler() {
    		$gridview = this.checked;
    		gridview.set($gridview);
    	}

    	function input1_change_handler() {
    		$darktheme = this.checked;
    		darktheme.set($darktheme);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("$gridview" in $$props) gridview.set($gridview = $$props.$gridview);
    		if ("$darktheme" in $$props) darktheme.set($darktheme = $$props.$darktheme);
    	};

    	return [$gridview, $darktheme, input0_change_handler, input1_change_handler];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/Footer.html generated by Svelte v3.17.1 */
    const file$8 = "src/Footer.html";

    function create_fragment$8(ctx) {
    	let footer;
    	let t0;
    	let div;
    	let t1;
    	let a0;
    	let t3;
    	let a1;
    	let current;
    	const settings = new Settings({ $$inline: true });

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			create_component(settings.$$.fragment);
    			t0 = space();
    			div = element("div");
    			t1 = text("GitHub repo:\n    ");
    			a0 = element("a");
    			a0.textContent = "https://github.com/rplus/PvP-moves";
    			t3 = text("\n    Database:\n    ");
    			a1 = element("a");
    			a1.textContent = "https://pvpoketw.com/";
    			attr_dev(a0, "href", "https://github.com/rplus/PvP-moves");
    			attr_dev(a0, "class", "svelte-1mo9z3x");
    			add_location(a0, file$8, 11, 4, 159);
    			attr_dev(a1, "href", "https://pvpoketw.com/");
    			attr_dev(a1, "class", "svelte-1mo9z3x");
    			add_location(a1, file$8, 13, 4, 261);
    			attr_dev(div, "class", "page-intro svelte-1mo9z3x");
    			add_location(div, file$8, 9, 2, 113);
    			attr_dev(footer, "class", "footer df ai-fe svelte-1mo9z3x");
    			add_location(footer, file$8, 6, 0, 62);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			mount_component(settings, footer, null);
    			append_dev(footer, t0);
    			append_dev(footer, div);
    			append_dev(div, t1);
    			append_dev(div, a0);
    			append_dev(div, t3);
    			append_dev(div, a1);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(settings.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(settings.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			destroy_component(settings);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/App.html generated by Svelte v3.17.1 */
    const file$9 = "src/App.html";

    function create_fragment$9(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let t2;
    	let current;
    	const selector = new Selector({ $$inline: true });
    	const pm = new PM({ $$inline: true });
    	const history = new History({ $$inline: true });
    	const footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(selector.$$.fragment);
    			t0 = space();
    			create_component(pm.$$.fragment);
    			t1 = space();
    			create_component(history.$$.fragment);
    			t2 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(div, "class", "workspace");
    			toggle_class(div, "darktheme", /*$darktheme*/ ctx[0]);
    			toggle_class(div, "gridview", /*$gridview*/ ctx[1]);
    			add_location(div, file$9, 10, 0, 215);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(selector, div, null);
    			append_dev(div, t0);
    			mount_component(pm, div, null);
    			append_dev(div, t1);
    			mount_component(history, div, null);
    			append_dev(div, t2);
    			mount_component(footer, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$darktheme*/ 1) {
    				toggle_class(div, "darktheme", /*$darktheme*/ ctx[0]);
    			}

    			if (dirty & /*$gridview*/ 2) {
    				toggle_class(div, "gridview", /*$gridview*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selector.$$.fragment, local);
    			transition_in(pm.$$.fragment, local);
    			transition_in(history.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selector.$$.fragment, local);
    			transition_out(pm.$$.fragment, local);
    			transition_out(history.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(selector);
    			destroy_component(pm);
    			destroy_component(history);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $darktheme;
    	let $gridview;
    	validate_store(darktheme, "darktheme");
    	component_subscribe($$self, darktheme, $$value => $$invalidate(0, $darktheme = $$value));
    	validate_store(gridview, "gridview");
    	component_subscribe($$self, gridview, $$value => $$invalidate(1, $gridview = $$value));

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("$darktheme" in $$props) darktheme.set($darktheme = $$props.$darktheme);
    		if ("$gridview" in $$props) gridview.set($gridview = $$props.$gridview);
    	};

    	return [$darktheme, $gridview];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    var app = new App({
      target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
