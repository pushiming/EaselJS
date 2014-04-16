/*
* Event
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * CreateJS 旗下所有的库（Easel, Sound, etc, ...）都挂载在命名空间 createjs 下面。所有的类都可从 createjs 这个命名空间直接访问。
 *
 * <h4>Example</h4>
 *      myObject.addEventListener("change", createjs.proxy(myMethod, scope));
 *
 * @module CreateJS
 * @main CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * 事件的构造器，用于 {{#crossLink "EventDispatcher"}}{{/crossLink}}.
 *
 * 由于事件对象经常会被多处使用，所以不要在事件监听函数以外的地方依赖它的任何状态或属性。
 * @class Event
 * @param {String} type 事件类型。
 * @param {Boolean} bubbles 是否在显示对象列表中向上冒泡。
 * @param {Boolean} cancelable 事件的默认行为是否能被取消。
 * @constructor
 **/
var Event = function(type, bubbles, cancelable) {
  this.initialize(type, bubbles, cancelable);
};
var p = Event.prototype;

// events:

// public properties:

	/**
	 * 事件类型。
	 * @property type
	 * @type String
	 **/
	p.type = null;

	/**
	 * 事件的目标对象。
	 * @property target
	 * @type Object
	 * @default null
	 * @readonly
	*/
	p.target = null;

	/**
     * 对于冒泡的事件来说，此属性指向事件的当前目标对象；对于不冒泡的事件来说，此属性始终等同于 target.
     * 举例：
     * 如果 childObj 的父节点为 parentObj, 然后在 childObj 上触发了一个事件，并且冒泡到 parentObj.
     * 那么，在 prentObj 的事件监听函数中，target 是 childObj, currentTarget 为 parentObj.
	 * @property currentTarget
	 * @type Object
	 * @default null
	 * @readonly
	*/
	p.currentTarget = null;

	/**
	 * 对于冒泡的事件来说，这个属性表示当前事件处于哪个阶段：<OL>
	 * 	<LI> capture phase: starting from the top parent to the target</LI>
	 * 	<LI> at target phase: currently being dispatched from the target</LI>
	 * 	<LI> bubbling phase: from the target to the top parent</LI>
	 * </OL>
	 * @property eventPhase
	 * @type Number
	 * @default 0
	 * @readonly
	*/
	p.eventPhase = 0;

	/**
	 * 是否在显示对象列表中向上冒泡。
	 * @property bubbles
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.bubbles = false;

	/**
     * 事件的默认行为是否能被取消。
	 * Indicates whether the default behaviour of this event can be cancelled via
	 * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
	 * @property cancelable
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.cancelable = false;

	/**
	 * 事件产生时的时间戳。
	 * @property timeStamp
	 * @type Number
	 * @default 0
	 * @readonly
	*/
	p.timeStamp = 0;

	/**
	 * {{#crossLink "Event/preventDefault"}}{{/crossLink}} 是否在此事件上被调用了。
	 * @property defaultPrevented
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.defaultPrevented = false;

	/**
	 * {{#crossLink "Event/stopPropagation"}}{{/crossLink}} 或
	 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} 是否在此事件上被调用了。
	 * @property propagationStopped
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.propagationStopped = false;

	/**
	 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} 是否在此事件上被调用了。
	 * @property immediatePropagationStopped
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.immediatePropagationStopped = false;
	
	/**
	 * {{#crossLink "Event/remove"}}{{/crossLink}} 是否在此事件上被调用了。
	 * @property removed
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.removed = false;

// constructor:
	/**
	 * 初始化。
	 * @method initialize
	 * @param {String} type 事件类型。
     * @param {Boolean} bubbles 是否在显示对象列表中向上冒泡。
     * @param {Boolean} cancelable 事件的默认行为是否能被取消。
	 * @protected
	 **/
	p.initialize = function(type, bubbles, cancelable) {
		this.type = type;
		this.bubbles = bubbles;
		this.cancelable = cancelable;
		this.timeStamp = (new Date()).getTime();
	};

// public methods:

	/**
	 * 将 {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} 设为 true.
	 * @method preventDefault
	 **/
	p.preventDefault = function() {
		this.defaultPrevented = true;
	};

	/**
	 * 将 {{#crossLink "Event/propagationStopped"}}{{/crossLink}} 设为 true.
	 * @method stopPropagation
	 **/
	p.stopPropagation = function() {
		this.propagationStopped = true;
	};

	/**
	 * 将 {{#crossLink "Event/propagationStopped"}}{{/crossLink}} 和
	 * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} 设为 true.
	 * @method stopImmediatePropagation
	 **/
	p.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = true;
	};
	
	/**
	 * 通过 removeEventListener(); 将当前活动的事件移除。
	 * 
	 * 		myBtn.addEventListener("click", function(evt) {
	 * 			// do stuff...
	 * 			evt.remove(); // removes this listener.
	 * 		});
	 * 
	 * @method remove
	 **/
	p.remove = function() {
		this.removed = true;
	};
	
	/**
	 * 返回一个事件对象的拷贝。
	 * @method clone
	 * @return {Event} 此事件对象的拷贝。
	 **/
	p.clone = function() {
		return new Event(this.type, this.bubbles, this.cancelable);
	};
	
	/**
	 * Provides a chainable shortcut method for setting a number of properties on the instance.
	 *
	 * @method set
	 * @param {Object} props A generic object containing properties to copy to the instance.
	 * @return {Event} Returns the instance the method is called on (useful for chaining calls.)
	*/
	p.set = function(props) {
		for (var n in props) { this[n] = props[n]; }
		return this;
	};

	/**
	 * 返回此事件的字符串表示。
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Event (type="+this.type+")]";
	};

createjs.Event = Event;
}());
