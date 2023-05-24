System.register("chunks:///_virtual/App.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './env', './CommonPopup.ts', './GameConst.ts', './GameData.ts', './DeckController.ts', './ThemeManagement.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, JsonAsset, Node, Prefab, log, view, screen, instantiate, Component, DEBUG, CommonPopup, Constants, GameData, DeckController, ThemeManagement;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      JsonAsset = module.JsonAsset;
      Node = module.Node;
      Prefab = module.Prefab;
      log = module.log;
      view = module.view;
      screen = module.screen;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      DEBUG = module.DEBUG;
    }, function (module) {
      CommonPopup = module.CommonPopup;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      GameData = module.GameData;
    }, function (module) {
      DeckController = module.DeckController;
    }, function (module) {
      ThemeManagement = module.ThemeManagement;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "55543hoaohMQaDBh3UQsNVk", "App", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PageName = Constants.PageName;
      var App = exports('App', (_dec = ccclass('App'), _dec2 = property({
        type: JsonAsset
      }), _dec3 = property({
        type: ThemeManagement
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: CommonPopup
      }), _dec7 = property([Prefab]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(App, _Component);

        function App() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.IS_DEVELOPMENT = void 0;

          _initializerDefineProperty(_this, "questionJson", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "themeManagement", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pageContainer", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "screenLocker", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "popup", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pagePrefabs", _descriptor6, _assertThisInitialized(_this));

          _this.GameData = void 0;
          _this.DeckController = void 0;
          _this.designResolution = {
            width: 0,
            height: 0,
            ratio: 0
          };
          _this.frameSize = {
            width: 0,
            height: 0,
            ratio: 0
          };
          _this.visiblePages = [];
          _this.pageMap = new Map();
          _this.pageCacheMap = new Map();
          _this.curPage = null;
          return _this;
        }

        var _proto = App.prototype;

        _proto.onLoad = function onLoad() {
          this.IS_DEVELOPMENT = DEBUG;

          if (this.IS_DEVELOPMENT) {
            log('=======DEBUG MODE======');
            globalThis.app = this;
            globalThis.view = view;
            globalThis.screenCocos = screen;
          } // init service


          this.GameData = new GameData();
          this.DeckController = new DeckController();
          this.DeckController.addDeck('0', this.questionJson.json);
          this.screenLocker.active = false;
          view.setResizeCallback(this.updatePageSize.bind(this)); // retrieve original canvas design size

          var designResolution = view.getDesignResolutionSize();
          this.designResolution.width = designResolution.width;
          this.designResolution.height = designResolution.height;
          this.designResolution.ratio = designResolution.width / designResolution.height; // mapping page

          this.pageMap.set(PageName.SelectGamePage, this.pagePrefabs[0]);
          this.pageMap.set(PageName.GameInfoPage, this.pagePrefabs[1]);
          this.pageMap.set(PageName.CreateRoomPage, this.pagePrefabs[2]);
          this.pageMap.set(PageName.JoinRoomPage, this.pagePrefabs[3]);
          this.pageMap.set(PageName.PassAndPlayPage, this.pagePrefabs[4]);
          this.pageMap.set(PageName.GameIntroPage, this.pagePrefabs[5]);
          this.pageMap.set(PageName.SelectDifficultyPage, this.pagePrefabs[6]);
          this.pageMap.set(PageName.SelectDeckPage, this.pagePrefabs[7]);
          this.pageMap.set(PageName.QuestionPage, this.pagePrefabs[8]); // open default

          this.openPage(PageName.SelectGamePage);
          this.updatePageSize();
        };

        _proto.updatePageSize = function updatePageSize() {
          log('---- updatePageSize ----');
          var windowSize = screen.windowSize;
          this.frameSize.width = windowSize.width / screen.devicePixelRatio;
          this.frameSize.height = windowSize.height / screen.devicePixelRatio;
          this.frameSize.ratio = this.frameSize.width / this.frameSize.height;
          var scalerX = this.frameSize.width / this.designResolution.width;
          var scalerY = this.frameSize.height / this.designResolution.height;

          for (var index = 0; index < this.visiblePages.length; index++) {
            var page = this.visiblePages[index];
            page.updatePageSize(scalerX, scalerY);
          }
        };

        _proto.openPage = function openPage(pageName, payload) {
          if (payload === void 0) {
            payload = null;
          }

          if (!this.pageCacheMap.has(pageName)) {
            var node = instantiate(this.pageMap.get(pageName));
            this.pageContainer.addChild(node);
            var pageCtrl = node.getComponent(pageName);
            this.visiblePages.push(pageCtrl);
            this.pageCacheMap.set(pageName, pageCtrl);
          }

          if (this.curPage) this.curPage.onHide();
          var nextPage = this.pageCacheMap.get(pageName);
          if (nextPage == null) throw new Error('Next page is null');
          this.transitPage(this.curPage, nextPage);
          if (payload) nextPage.setPayload(payload);
          nextPage.onShow();
        };

        _proto.openPopup = function openPopup(data) {
          var _this2 = this;

          this.screenLocker.active = true;
          this.popup.show(data, function () {
            _this2.screenLocker.active = false;
          }, true);
        };

        _proto.changeTheme = function changeTheme(themId) {
          this.GameData.setTheme(themId);
          this.themeManagement.changeTheme(themId);
        };

        _proto.transitPage = function transitPage(from, to) {
          from && from.hideTransition();
          to && to.showTransition();
          this.curPage = to;
        };

        return App;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "questionJson", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "themeManagement", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pageContainer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "screenLocker", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "popup", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "pagePrefabs", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BotPlayerItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, LabelComponent, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      LabelComponent = module.LabelComponent;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "565aaFz8DlM6Jo2/00FtL5Y", "BotPlayerItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Player = exports('Player', function Player(name) {
        this.Name = void 0;
        this.Name = name;
      });
      var BotPlayerItem = exports('BotPlayerItem', (_dec = ccclass('BotPlayerItem'), _dec2 = property({
        type: LabelComponent
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BotPlayerItem, _Component);

        function BotPlayerItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "lbName", _descriptor, _assertThisInitialized(_this));

          _this.onKick = void 0;
          _this.Data = void 0;
          _this.Index = void 0;
          return _this;
        }

        var _proto = BotPlayerItem.prototype;

        _proto.setData = function setData(data, index, onKick) {
          this.lbName.string = data.Name;
          this.onKick = onKick;
          this.Data = data;
          this.Index = index;
        };

        _proto.onKickClicked = function onKickClicked() {
          this.onKick && this.onKick(this);
        };

        return BotPlayerItem;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ColorPalette.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, Sprite, LabelComponent, find, Color, Component, Constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Sprite = module.Sprite;
      LabelComponent = module.LabelComponent;
      find = module.find;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "fd7e5WUiNdAh4tRAKaWg2uI", "ColorPalette", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Theme = Constants.Theme;
      var PaletteProperty = exports('PaletteProperty', Enum({
        None: 0,
        BackgroundColor: 1,
        HighlightColor: 2,
        CommonButtonColor: 3,
        DescriptionTextColor: 4,
        QuestionTextColor: 5,
        PopupColor: 6,
        QuestionBgColor: 7,
        IntroBgColor: 8,
        DifficultyBgColor: 9
      }));
      var ColorPalette = exports('ColorPalette', (_dec = ccclass('ColorPalette'), _dec2 = property({
        type: PaletteProperty
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ColorPalette, _Component);

        function ColorPalette() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "paletteProperty", _descriptor, _assertThisInitialized(_this));

          _this.app = void 0;
          _this.targetSprite = null;
          _this.targetLabel = null;
          return _this;
        }

        var _proto = ColorPalette.prototype;

        _proto.onLoad = function onLoad() {
          this.targetSprite = this.node.getComponent(Sprite);
          this.targetLabel = this.node.getComponent(LabelComponent);
          this.app = find('App').getComponent('App');
          this.updateColor(this.app.GameData.getThemeId());
        };

        _proto.updateColor = function updateColor(themeId) {
          var theme = Theme[themeId];
          if (theme === null || theme == undefined) return;
          var propertyKey = PaletteProperty[this.paletteProperty];
          if (this.targetSprite != null) this.targetSprite.color = new Color().fromHEX(theme[propertyKey]);
          if (this.targetLabel != null) this.targetLabel.color = new Color().fromHEX(theme[propertyKey]);
        };

        return ColorPalette;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "paletteProperty", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PaletteProperty.None;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CommonPopup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, LabelComponent, Button, EditBox, Tween, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      LabelComponent = module.LabelComponent;
      Button = module.Button;
      EditBox = module.EditBox;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

      cclegacy._RF.push({}, "57329/0kUpL8Zk9uajNWSnL", "CommonPopup", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CommonPopupData = exports('CommonPopupData', function CommonPopupData() {
        this.Title = '';
        this.Description = '';
        this.ButtonYesText = 'YES';
        this.ButtonYesCallback = null;
        this.ButtonNoText = 'NO';
        this.ButtonNoCallback = null;
        this.HasEditBox = false;
        this.EditBoxPlaceHolderText = '';
      });
      var CommonPopup = exports('CommonPopup', (_dec = ccclass('CommonPopup'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: LabelComponent
      }), _dec4 = property({
        type: LabelComponent
      }), _dec5 = property({
        type: LabelComponent
      }), _dec6 = property({
        type: LabelComponent
      }), _dec7 = property({
        type: Button
      }), _dec8 = property({
        type: Button
      }), _dec9 = property({
        type: EditBox
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CommonPopup, _Component);

        function CommonPopup() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "popupNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbTitle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbDescription", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbButtonYes", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbButtonNo", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnYes", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnNo", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "editBox", _descriptor8, _assertThisInitialized(_this));

          _this.hasEditBox = void 0;
          _this.btnYesCallback = void 0;
          _this.btnNoCallback = void 0;
          _this.callbackData = void 0;
          _this.onCompleted = void 0;
          return _this;
        }

        var _proto = CommonPopup.prototype;

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {};

        _proto.show = function show(data, onCompleted, hasAnim) {
          if (hasAnim === void 0) {
            hasAnim = false;
          }

          this._setData(data);

          this.node.active = true;
          this.onCompleted = onCompleted;

          if (hasAnim) {
            Tween.stopAllByTarget(this.popupNode);
            tween(this.popupNode).set({
              scale: Vec3.ZERO
            }).to(0.35, {
              scale: Vec3.ONE
            }, {
              easing: 'quadOut'
            }).start();
          } else {
            this.node.active = true;
          }
        };

        _proto.hide = function hide(hasAnim) {
          var _this2 = this;

          if (hasAnim === void 0) {
            hasAnim = false;
          }

          if (hasAnim) {
            Tween.stopAllByTarget(this.popupNode);
            tween(this.popupNode).set({
              scale: Vec3.ONE
            }).to(0.2, {
              scale: Vec3.ZERO
            }, {
              easing: 'quadOut'
            }).call(function () {
              _this2.node.active = false;
            }).start();
          } else {
            this.node.active = false;
          }
        };

        _proto.onYesClicked = function onYesClicked() {
          if (this.hasEditBox && this, this.editBox.string.trim().length === 0) return;
          this.hide(true);
          this.btnYesCallback && this.btnYesCallback(this.callbackData);
          this.onCompleted && this.onCompleted();
        };

        _proto.onNoClicked = function onNoClicked() {
          this.hide(true);
          this.btnNoCallback && this.btnNoCallback(this.callbackData);
          this.onCompleted && this.onCompleted();
        };

        _proto.onEditBoxChanged = function onEditBoxChanged() {
          if (this.hasEditBox) {
            this.callbackData = this.editBox.string.trim();
          }
        };

        _proto._setData = function _setData(data) {
          this.lbTitle.string = data.Title;
          this.lbDescription.string = data.Description;
          this.lbButtonYes.string = data.ButtonYesText;
          this.lbButtonNo.string = data.ButtonNoText;
          this.btnYes.node.active = !!data.ButtonYesCallback;
          this.btnYesCallback = data.ButtonYesCallback;
          this.btnNo.node.active = !!data.ButtonNoCallback;
          this.btnNoCallback = data.ButtonNoCallback;
          this.editBox.node.active = data.HasEditBox;
          this.hasEditBox = data.HasEditBox;

          if (data.HasEditBox) {
            this.editBox.placeholder = data.EditBoxPlaceHolderText;
          }
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.showTransition = function showTransition() {};

        _proto.hideTransition = function hideTransition() {};

        _proto.onBack = function onBack() {};

        return CommonPopup;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "popupNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbTitle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbDescription", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbButtonYes", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbButtonNo", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnYes", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btnNo", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "editBox", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CreateRoomPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, EditBox, find, log, Tween, tween, Component, Constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      EditBox = module.EditBox;
      find = module.find;
      log = module.log;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "332d0NRQQpEbJ9H+zk404T6", "CreateRoomPage", undefined);

      var PageName = Constants.PageName;
      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CreateRoomPage = exports('CreateRoomPage', (_dec = ccclass('CreateRoomPage'), _dec2 = property(UIOpacity), _dec3 = property({
        type: EditBox
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CreateRoomPage, _Component);

        function CreateRoomPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "passCodeInput", _descriptor2, _assertThisInitialized(_this));

          _this.app = void 0;
          return _this;
        }

        var _proto = CreateRoomPage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {};

        _proto.onPassCodeInputChanged = function onPassCodeInputChanged() {
          log("Input " + this.passCodeInput.string);
        };

        _proto.onCreate = function onCreate() {};

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this2 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this2.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {
          this.app.openPage(PageName.GameInfoPage);
        };

        return CreateRoomPage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "passCodeInput", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Canvas, UITransform, instantiate, Label, Color, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      Color = module.Color;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct TRT', 'Env TRT', 'TRT All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'TRT', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DebugView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Dropdown.ts', './GameConst.ts', './env'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, LabelComponent, Component, Dropdown, DropdownItemData, Constants, DEBUG;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      LabelComponent = module.LabelComponent;
      Component = module.Component;
    }, function (module) {
      Dropdown = module.Dropdown;
      DropdownItemData = module.DropdownItemData;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      DEBUG = module.DEBUG;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "87f15SKOBFC168PHcqjVl/v", "DebugView", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Theme = Constants.Theme;
      var DebugView = exports('DebugView', (_dec = ccclass('DebugView'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: LabelComponent
      }), _dec4 = property({
        type: Dropdown
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugView, _Component);

        function DebugView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "view", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbDebug", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "themeDropdown", _descriptor3, _assertThisInitialized(_this));

          _this.themeManagement = null;
          return _this;
        }

        var _proto = DebugView.prototype;

        _proto.onLoad = function onLoad() {
          this.node.active = DEBUG;
          var themeOption = [];

          for (var key in Theme) {
            themeOption.push(new DropdownItemData(key, Theme[key].Name));
          }

          this.themeDropdown.init(themeOption, this.onThemeChange.bind(this));
        };

        _proto.onShow = function onShow() {
          this.view.active = !this.view.active;
          this.lbDebug.string = this.view.active ? 'Close' : 'Debug';
        };

        _proto.onThemeChange = function onThemeChange(themeId) {
          globalThis.app.changeTheme(themeId);
        };

        return DebugView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "view", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbDebug", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "themeDropdown", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DeckController.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fad618c61tHZpd5Y9JgNHdt", "DeckController", undefined);

      var QuestionData = exports('QuestionData', function QuestionData() {
        this.Type = void 0;
        this.Level = void 0;
        this.Penalty = void 0;
        this.English = void 0;
        this.Japanese = void 0;
      });
      var DeckController = exports('DeckController', /*#__PURE__*/function () {
        function DeckController() {
          this.deckMap = {};
        }

        var _proto = DeckController.prototype;

        _proto.addDeck = function addDeck(deckId, questions) {
          if (this.deckMap[deckId]) {
            console.warn("The deck " + deckId + " already existed");
            return false;
          }

          this.deckMap[deckId] = {};
          var deck = this.deckMap[deckId];

          for (var i = 0; i < questions.length; i++) {
            var question = questions[i];
            if (!deck["" + question.Level]) deck["" + question.Level] = [];
            deck["" + question.Level].push(question);
          }

          return true;
        };

        _proto.getQuestions = function getQuestions(deckId, level) {
          if (!this.deckMap[deckId]) return [];
          var deck = this.deckMap[deckId];
          if (!deck["" + level]) return [];
          return [].concat(deck["" + level]);
        };

        return DeckController;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DeckItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, LabelComponent, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      LabelComponent = module.LabelComponent;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b6fa7zUM7ZC17Ob7MJGK8qT", "DeckItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Deck = exports('Deck', function Deck(title, description) {
        this.Title = void 0;
        this.Description = void 0;
        this.Title = title;
        this.Description = description;
      });
      var DeckItem = exports('DeckItem', (_dec = ccclass('DeckItem'), _dec2 = property({
        type: LabelComponent
      }), _dec3 = property({
        type: LabelComponent
      }), _dec4 = property({
        type: Sprite
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DeckItem, _Component);

        function DeckItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "lbTitle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbDescription", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "deckIcon", _descriptor3, _assertThisInitialized(_this));

          _this.onClick = void 0;
          _this.Data = void 0;
          _this.Index = void 0;
          return _this;
        }

        var _proto = DeckItem.prototype;

        _proto.setData = function setData(data, index, onClick) {
          // this.lbTitle.string = data.Title;
          // this.lbDescription.string = data.Description;
          this.onClick = onClick;
          this.Data = data;
          this.Index = index;
        };

        _proto.onClicked = function onClicked() {
          this.onClick && this.onClick(this);
        };

        return DeckItem;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbTitle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbDescription", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "deckIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Dropdown.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DropdownOption.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Prefab, LabelComponent, instantiate, Component, DropdownOption;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      LabelComponent = module.LabelComponent;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      DropdownOption = module.DropdownOption;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "6cd5aujHmFETpy2UreEX4Dv", "Dropdown", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Dropdown = exports('Dropdown', (_dec = ccclass('Dropdown'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: LabelComponent
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Dropdown, _Component);

        function Dropdown() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "optionView", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "optionTemplate", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "optionContainer", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "curOptionName", _descriptor4, _assertThisInitialized(_this));

          _this.onChangeOption = null;
          return _this;
        }

        var _proto = Dropdown.prototype;

        _proto.init = function init(data, onChangeOption) {
          this.curOptionName.string = data[0].name;
          this.onChangeOption = onChangeOption;

          for (var index = 0; index < data.length; index++) {
            var optionData = data[index];
            var node = instantiate(this.optionTemplate);
            this.optionContainer.addChild(node);
            var ctrl = node.getComponent(DropdownOption);
            ctrl.setData(optionData, this.onOptionClick.bind(this));
          }
        };

        _proto.onClick = function onClick() {
          this.optionView.active = !this.optionView.active;
        };

        _proto.onOptionClick = function onOptionClick(data) {
          this.optionView.active = false;
          this.curOptionName.string = data.name;
          this.onChangeOption && this.onChangeOption(data.id);
        };

        return Dropdown;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "optionView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "optionTemplate", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "optionContainer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "curOptionName", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      var DropdownItemData = exports('DropdownItemData', function DropdownItemData(id, name) {
        this.name = 'Option';
        this.id = '';
        this.id = id;
        this.name = name;
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DropdownOption.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, LabelComponent, Button, Node, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      LabelComponent = module.LabelComponent;
      Button = module.Button;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "8e4d8hkWUxPPonmWogRK078", "DropdownOption", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DropdownOption = exports('DropdownOption', (_dec = ccclass('DropdownOption'), _dec2 = property({
        type: LabelComponent
      }), _dec3 = property({
        type: Button
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DropdownOption, _Component);

        function DropdownOption() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "optionName", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "button", _descriptor2, _assertThisInitialized(_this));

          _this.callback = null;
          _this.data = null;
          return _this;
        }

        var _proto = DropdownOption.prototype;

        _proto.setData = function setData(data, onClick) {
          this.data = data;
          this.optionName.string = data.name;
          this.callback = onClick;
          this.button.node.on(Node.EventType.TOUCH_START, this.onClick.bind(this));
        };

        _proto.onClick = function onClick() {
          this.callback && this.callback(this.data);
        };

        return DropdownOption;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "optionName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "button", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameConst.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "711241GI0lEFojizhc9aDNo", "GameConst", undefined);

      var Constants = exports('Constants', {
        PageName: {
          SelectGamePage: 'SelectGamePage',
          GameInfoPage: 'GameInfoPage',
          CreateRoomPage: 'CreateRoomPage',
          JoinRoomPage: 'JoinRoomPage',
          PassAndPlayPage: 'PassAndPlayPage',
          GameIntroPage: 'GameIntroPage',
          SelectDifficultyPage: 'SelectDifficultyPage',
          SelectDeckPage: 'SelectDeckPage',
          QuestionPage: 'QuestionPage'
        },
        GamePlaySetting: {
          MaxPlayer: 8
        },
        Theme: {
          0: {
            Name: 'Green',
            BackgroundColor: '#D9D9D9',
            HighlightColor: '#97B952',
            CommonButtonColor: '#FFFFFF',
            DescriptionTextColor: '#000000',
            QuestionTextColor: '#FFFFFF',
            PopupColor: '#97B952',
            QuestionBgColor: '#97B952',
            IntroBgColor: '#D9D9D9',
            DifficultyBgColor: '#FFFFFF'
          },
          1: {
            Name: 'Blue',
            BackgroundColor: '#71A1D1',
            HighlightColor: '#FABD42',
            CommonButtonColor: '#F7F4ED',
            DescriptionTextColor: '#FFFFFF',
            QuestionTextColor: '#000000',
            PopupColor: '#71A1D1',
            QuestionBgColor: '#F7F4ED',
            IntroBgColor: '#F7F4ED',
            DifficultyBgColor: '#F7F4ED'
          }
        }
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameData.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1f7cbgDowlLT5HMVONqDL/3", "GameData", undefined);

      var TransientData = function TransientData() {
        this.PlayerName = void 0;
        this.ThemeId = '0';
      };

      var GameData = exports('GameData', /*#__PURE__*/function () {
        function GameData() {
          this.transientData = void 0;
          this.persistentData = void 0;
          this.transientData = new TransientData();
        }

        var _proto = GameData.prototype;

        _proto.getPlayerName = function getPlayerName() {
          return this.transientData.PlayerName;
        };

        _proto.getThemeId = function getThemeId() {
          return this.transientData.ThemeId;
        };

        _proto.setPlayerName = function setPlayerName(name) {
          this.transientData.PlayerName = name;
        };

        _proto.setTheme = function setTheme(themeId) {
          this.transientData.ThemeId = themeId;
        };

        return GameData;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameInfoPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, find, Tween, tween, Component, Constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      find = module.find;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "e31ee8sJSxPzqnkM/F9I6so", "GameInfoPage", undefined);

      var PageName = Constants.PageName;
      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GameInfoPage = exports('GameInfoPage', (_dec = ccclass('GameInfoPage'), _dec2 = property(UIOpacity), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameInfoPage, _Component);

        function GameInfoPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _this.app = void 0;
          _this.gameId = void 0;
          return _this;
        }

        var _proto = GameInfoPage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {
          this.gameId = data;
        };

        _proto.start = function start() {};

        _proto.onCreate = function onCreate() {
          this.app.openPage(PageName.CreateRoomPage);
        };

        _proto.onJoin = function onJoin() {
          this.app.openPage(PageName.JoinRoomPage);
        };

        _proto.onPassAndPLay = function onPassAndPLay() {
          this.app.openPage(PageName.PassAndPlayPage, this.gameId);
        };

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this2 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this2.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {
          this.app.openPage(PageName.SelectGamePage);
        };

        return GameInfoPage;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameIntroPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts', './CommonPopup.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, find, Tween, tween, Component, Constants, CommonPopupData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      find = module.find;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      CommonPopupData = module.CommonPopupData;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "90d0epMVfdFt6aJOp8zhuUq", "GameIntroPage", undefined);

      var PageName = Constants.PageName;
      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GameIntroPage = exports('GameIntroPage', (_dec = ccclass('GameIntroPage'), _dec2 = property(UIOpacity), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameIntroPage, _Component);

        function GameIntroPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _this.app = void 0;
          return _this;
        }

        var _proto = GameIntroPage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {};

        _proto.onStartGame = function onStartGame() {
          this.app.openPage(PageName.SelectDifficultyPage);
        };

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this2 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this2.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {
          var _this3 = this;

          var popupData = new CommonPopupData();
          popupData.Description = 'If you exit the game, the game room will be terminated';
          popupData.ButtonYesText = 'OKAY';

          popupData.ButtonYesCallback = function () {
            return _this3.app.openPage(PageName.SelectGamePage);
          };

          popupData.ButtonNoText = 'CANCEL';

          popupData.ButtonNoCallback = function () {};

          this.app.openPopup(popupData);
        };

        return GameIntroPage;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, math, UITransform, LabelComponent, Sprite, Color, Tween, tween, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      math = module.math;
      UITransform = module.UITransform;
      LabelComponent = module.LabelComponent;
      Sprite = module.Sprite;
      Color = module.Color;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "89bd6sG8qRLU5UORfWtMTIX", "GameItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var lerp = math.lerp;
      var GameItem = exports('GameItem', (_dec = ccclass('GameItem'), _dec2 = property({
        type: UITransform
      }), _dec3 = property({
        type: LabelComponent
      }), _dec4 = property({
        type: LabelComponent
      }), _dec5 = property({
        type: Sprite
      }), _dec6 = property({
        type: Sprite
      }), _dec7 = property({
        type: Sprite
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameItem, _Component);

        function GameItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "itemTransform", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbDescription", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "background", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "iconGame", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "iconHeart", _descriptor6, _assertThisInitialized(_this));

          _this.isShowDetail = false;
          _this.data = null;
          _this.callback = null;
          _this.index = null;
          return _this;
        }

        var _proto = GameItem.prototype;

        _proto.setInfo = function setInfo(index, info, callback) {
          if (callback === void 0) {
            callback = null;
          } //TODO: load real data


          info = {
            id: "doanddrink" + index,
            name: "DO OR DRINK " + index,
            description: 'Do the dare on the card or take a drink. If you do the dare, you get to take the card',
            shortDescription: 'Do the dare on the card or take a drink'
          };
          this.data = info;
          this.isShowDetail = false;
          this.callback = callback;
          this.index = index;
          this.lbName.string = this.data.name;
        };

        _proto.showDetail = function showDetail(isDetail, hasAnim) {
          var _this2 = this;

          if (hasAnim === void 0) {
            hasAnim = false;
          }

          this.isShowDetail = isDetail;
          this.lbDescription.string = this.isShowDetail ? this.data.description : this.data.shortDescription;
          this.iconHeart.color = this.isShowDetail ? Color.WHITE : Color.BLACK;
          this.lbName.color = this.isShowDetail ? Color.WHITE : Color.BLACK;
          this.lbDescription.color = this.isShowDetail ? Color.WHITE : Color.BLACK;
          this.iconGame.node.active = this.isShowDetail;

          if (hasAnim) {
            Tween.stopAllByTarget(this.itemTransform);
            tween(this.itemTransform).to(0.4, {
              height: this.isShowDetail ? 543 : 186
            }, {
              easing: 'quadOut'
            }).start();
            var newColor = this.isShowDetail ? new Color().fromHEX('#96B952') : Color.WHITE;
            var lastColor = this.background.color;
            Tween.stopAllByTarget(this.background);
            tween(this.background).to(0.4, {}, {
              onUpdate: function onUpdate(target, ratio) {
                var color = new Color();
                color.r = lerp(lastColor.r, newColor.r, ratio);
                color.b = lerp(lastColor.b, newColor.b, ratio);
                color.g = lerp(lastColor.g, newColor.g, ratio);
                _this2.background.color = color;
              }
            }).start();
          } else {
            this.itemTransform.height = this.isShowDetail ? 543 : 186;
            this.background.color = this.isShowDetail ? new Color().fromHEX('#96B952') : Color.WHITE;
          }
        };

        _proto.onClicked = function onClicked() {
          this.callback && this.callback(this.index, this.isShowDetail, this.data.id);
        };

        return GameItem;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemTransform", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbDescription", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "background", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "iconGame", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "iconHeart", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JoinRoomPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, EditBox, find, log, Tween, tween, Component, Constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      EditBox = module.EditBox;
      find = module.find;
      log = module.log;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "ac17cAh8ZRPNbOy4gVkc7ff", "JoinRoomPage", undefined);

      var PageName = Constants.PageName;
      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var JoinRoomPage = exports('JoinRoomPage', (_dec = ccclass('JoinRoomPage'), _dec2 = property(UIOpacity), _dec3 = property({
        type: EditBox
      }), _dec4 = property({
        type: EditBox
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(JoinRoomPage, _Component);

        function JoinRoomPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "roomNumberInput", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "passCodeInput", _descriptor3, _assertThisInitialized(_this));

          _this.app = void 0;
          return _this;
        }

        var _proto = JoinRoomPage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {};

        _proto.onRoomNumberInputChanged = function onRoomNumberInputChanged() {
          log("Room Input " + this.roomNumberInput.string);
        };

        _proto.onPassCodeInputChanged = function onPassCodeInputChanged() {
          log("Pass Input " + this.passCodeInput.string);
        };

        _proto.onJoin = function onJoin() {};

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this2 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this2.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {
          this.app.openPage(PageName.GameInfoPage);
        };

        return JoinRoomPage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "roomNumberInput", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "passCodeInput", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './Dropdown.ts', './DropdownOption.ts', './App.ts', './DeckController.ts', './GameConst.ts', './GameData.ts', './GameItem.ts', './SelectGamePage.ts', './CreateRoomPage.ts', './GameInfoPage.ts', './GameIntroPage.ts', './JoinRoomPage.ts', './BotPlayerItem.ts', './PassAndPlayPage.ts', './CommonPopup.ts', './QuestionPage.ts', './DeckItem.ts', './SelectDeckPage.ts', './SelectDifficultyPage.ts', './ColorPalette.ts', './DebugView.ts', './ThemeManagement.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/PassAndPlayPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts', './BotPlayerItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, LabelComponent, Prefab, UITransform, Node, find, instantiate, Vec3, Tween, tween, Component, Constants, Player, BotPlayerItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      LabelComponent = module.LabelComponent;
      Prefab = module.Prefab;
      UITransform = module.UITransform;
      Node = module.Node;
      find = module.find;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      Player = module.Player;
      BotPlayerItem = module.BotPlayerItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "41587rDeZ5FDK53i3ReKOMv", "PassAndPlayPage", undefined);

      var PageName = Constants.PageName,
          GamePlaySetting = Constants.GamePlaySetting;
      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PassAndPlayPage = exports('PassAndPlayPage', (_dec = ccclass('PassAndPlayPage'), _dec2 = property(UIOpacity), _dec3 = property({
        type: LabelComponent
      }), _dec4 = property(Prefab), _dec5 = property(UITransform), _dec6 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PassAndPlayPage, _Component);

        function PassAndPlayPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbHostName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerPrefab", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playerContainerTransform", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "btnAddPlayer", _descriptor5, _assertThisInitialized(_this));

          _this.app = void 0;
          _this.gameId = void 0;
          _this.playerCount = 0;
          _this.players = [];
          return _this;
        }

        var _proto = PassAndPlayPage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {
          this.gameId = data;
        };

        _proto.start = function start() {
          this.addLocalPlayer();
        };

        _proto.addLocalPlayer = function addLocalPlayer() {
          var localPlayerName = this.app.GameData.getPlayerName();
          this.lbHostName.string = localPlayerName;
          this.players.push(new Player(localPlayerName));
        };

        _proto.addPlayer = function addPlayer() {
          if (this.playerCount >= GamePlaySetting.MaxPlayer) return;
          this.playerCount += 1;
          var node = instantiate(this.playerPrefab);
          this.playerContainerTransform.node.addChild(node);
          var ctrl = node.getComponent(BotPlayerItem);
          ctrl.setData(new Player("Player " + this.playerCount), this.playerCount, this.removePlayer.bind(this));
          this.players.push(ctrl.Data);
          var paddingYConatiner = 93;
          this.btnAddPlayer.setPosition(new Vec3(0, -this.playerContainerTransform.height - paddingYConatiner));
        };

        _proto.removePlayer = function removePlayer(player) {
          this.players.splice(player.Index, 1);
          this.playerCount -= 1;
          player.node.destroy();
        };

        _proto.onStartGame = function onStartGame() {
          this.app.openPage(PageName.GameIntroPage);
        };

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this2 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this2.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {
          this.app.openPage(PageName.GameInfoPage);
        };

        return PassAndPlayPage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbHostName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playerContainerTransform", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnAddPlayer", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/QuestionPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts', './CommonPopup.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, LabelComponent, find, Tween, tween, Component, Constants, CommonPopupData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      LabelComponent = module.LabelComponent;
      find = module.find;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      CommonPopupData = module.CommonPopupData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "01a62n2jdVFYJn5TRltWchZ", "QuestionPage", undefined);

      var PageName = Constants.PageName;
      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var QuestionPage = exports('QuestionPage', (_dec = ccclass('QuestionPage'), _dec2 = property(UIOpacity), _dec3 = property({
        type: LabelComponent
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(QuestionPage, _Component);

        function QuestionPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lbQuestion", _descriptor2, _assertThisInitialized(_this));

          _this.app = void 0;
          _this.questionsPool = void 0;
          return _this;
        }

        var _proto = QuestionPage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {
          this.loadQuestion();
        };

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {
          console.log("Open deck " + data['deckId'] + " with level " + data['level']);
          this.questionsPool = this.app.DeckController.getQuestions(data['deckId'], data['level']);
        };

        _proto.loadQuestion = function loadQuestion() {
          if (this.questionsPool.length == 0) return this.showEndPopup();
          var questionIndex = Math.floor(Math.random() * this.questionsPool.length);
          var question = this.questionsPool[questionIndex];
          var enContent = question.English.replace('$penalty', question.Penalty);
          var jaContent = question.Japanese.replace('$penalty', question.Penalty);
          this.lbQuestion.string = "\n" + enContent + "\n\n" + jaContent;
          this.questionsPool.splice(questionIndex, 1);
          console.log("Question pool has " + this.questionsPool.length + " questions remaining");
        };

        _proto.showEndPopup = function showEndPopup() {
          var _this2 = this;

          var commonPopupData = new CommonPopupData();
          commonPopupData.Title = 'Congratulation';
          commonPopupData.Description = 'You guys already passed all cards';
          commonPopupData.ButtonYesText = 'OKAY';

          commonPopupData.ButtonYesCallback = function () {
            _this2.app.openPage(PageName.SelectDifficultyPage);
          };

          this.app.openPopup(commonPopupData);
        };

        _proto.onNextQuestion = function onNextQuestion() {
          this.loadQuestion();
        };

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this3 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this3.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {
          this.app.openPage(PageName.SelectDeckPage);
        };

        return QuestionPage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbQuestion", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SelectDeckPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts', './DeckItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, Prefab, Node, find, instantiate, Tween, tween, Component, Constants, DeckItem, Deck;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      Prefab = module.Prefab;
      Node = module.Node;
      find = module.find;
      instantiate = module.instantiate;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      DeckItem = module.DeckItem;
      Deck = module.Deck;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "187d0QrbdxDRa1Ofct6ZUoQ", "SelectDeckPage", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PageName = Constants.PageName;
      var SelectDeckPage = exports('SelectDeckPage', (_dec = ccclass('SelectDeckPage'), _dec2 = property(UIOpacity), _dec3 = property(Prefab), _dec4 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SelectDeckPage, _Component);

        function SelectDeckPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "deckPrefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "container", _descriptor3, _assertThisInitialized(_this));

          _this.app = void 0;
          _this.questionPayload = {};
          return _this;
        }

        var _proto = SelectDeckPage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {
          this.questionPayload['level'] = data;
        };

        _proto.start = function start() {
          var deckData = new Deck('BEGINNER', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.');

          for (var index = 0; index < 1; index++) {
            var node = instantiate(this.deckPrefab);
            this.container.addChild(node);
            var ctrl = node.getComponent(DeckItem);
            ctrl.setData(deckData, index, this.onDeckClicked.bind(this));
          }
        };

        _proto.onDeckClicked = function onDeckClicked() {
          //TODO: implement pass deck id
          this.questionPayload['deckId'] = '0';
          this.app.openPage(PageName.QuestionPage, this.questionPayload);
        };

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this2 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this2.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {
          this.app.openPage(PageName.SelectDifficultyPage);
        };

        return SelectDeckPage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "deckPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SelectDifficultyPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConst.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, find, Tween, tween, Component, Constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      find = module.find;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Constants = module.Constants;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "b43b6/bpkZHErO+LXCR99tK", "SelectDifficultyPage", undefined);

      var PageName = Constants.PageName;
      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SelectDifficultyPage = exports('SelectDifficultyPage', (_dec = ccclass('SelectDifficultyPage'), _dec2 = property(UIOpacity), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SelectDifficultyPage, _Component);

        function SelectDifficultyPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _this.app = void 0;
          return _this;
        }

        var _proto = SelectDifficultyPage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {};

        _proto.onSelectDificulty = function onSelectDificulty(event, data) {
          this.app.openPage(PageName.SelectDeckPage, data);
        };

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this2 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this2.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {
          this.app.openPage(PageName.GameIntroPage);
        };

        return SelectDifficultyPage;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SelectGamePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameItem.ts', './GameConst.ts', './CommonPopup.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, Prefab, Node, find, instantiate, Tween, tween, Component, GameItem, Constants, CommonPopupData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      Prefab = module.Prefab;
      Node = module.Node;
      find = module.find;
      instantiate = module.instantiate;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      GameItem = module.GameItem;
    }, function (module) {
      Constants = module.Constants;
    }, function (module) {
      CommonPopupData = module.CommonPopupData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "32c7c1/Kx9Dhb/NlaSM4PXZ", "SelectGamePage", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PageName = Constants.PageName;
      var SelectGamePage = exports('SelectGamePage', (_dec = ccclass('SelectGamePage'), _dec2 = property(UIOpacity), _dec3 = property(Prefab), _dec4 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SelectGamePage, _Component);

        function SelectGamePage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "uiOpacity", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "itemPrefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "container", _descriptor3, _assertThisInitialized(_this));

          _this.items = [];
          _this.app = void 0;
          return _this;
        }

        var _proto = SelectGamePage.prototype;

        _proto.onLoad = function onLoad() {
          this.app = find('App').getComponent('App');
        };

        _proto.onShow = function onShow() {};

        _proto.onHide = function onHide() {};

        _proto.setPayload = function setPayload(data) {};

        _proto.start = function start() {
          for (var index = 0; index < 1; index++) {
            var node = instantiate(this.itemPrefab);
            this.container.addChild(node);
            var ctrl = node.getComponent(GameItem);
            ctrl.setInfo(index, null, this.onItemClicked.bind(this));
            ctrl.showDetail(index === 0, false);
            this.items.push(ctrl);
          }

          this.showInputNamePrompt();
        };

        _proto.showInputNamePrompt = function showInputNamePrompt() {
          var _this2 = this;

          var commonPopupData = new CommonPopupData();
          commonPopupData.Title = 'Input your name';
          commonPopupData.HasEditBox = true;
          commonPopupData.EditBoxPlaceHolderText = 'Enter player name...';
          commonPopupData.ButtonYesText = 'OKAY';

          commonPopupData.ButtonYesCallback = function (name) {
            _this2.app.GameData.setPlayerName(name);
          };

          this.app.openPopup(commonPopupData);
        };

        _proto.onItemClicked = function onItemClicked(itemIndex, hasJoinGame, gameId) {
          if (hasJoinGame) {
            this.app.openPage(PageName.GameInfoPage, gameId);
            return;
          }

          for (var index = 0; index < this.items.length; index++) {
            this.items[index].showDetail(index === itemIndex, true);
          }
        };

        _proto.showTransition = function showTransition() {
          Tween.stopAllByTarget(this.uiOpacity);
          this.node.active = true;
          tween(this.uiOpacity).set({
            opacity: 0
          }).to(0.3, {
            opacity: 255
          }).start();
        };

        _proto.hideTransition = function hideTransition() {
          var _this3 = this;

          Tween.stopAllByTarget(this.uiOpacity);
          tween(this.uiOpacity).set({
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).call(function () {
            _this3.node.active = false;
          }).start();
        };

        _proto.updatePageSize = function updatePageSize(scalerX, scalerY) {};

        _proto.onBack = function onBack() {};

        return SelectGamePage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ThemeManagement.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ColorPalette.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _createForOfIteratorHelperLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component, ColorPalette;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      ColorPalette = module.ColorPalette;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "89ac7byHXNHW5AZytYO73FD", "ThemeManagement", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ThemeManagement = exports('ThemeManagement', (_dec = ccclass('ThemeManagement'), _dec2 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ThemeManagement, _Component);

        function ThemeManagement() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "targets", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ThemeManagement.prototype;

        _proto.changeTheme = function changeTheme(themeId) {
          for (var index = 0; index < this.targets.length; index++) {
            var target = this.targets[index];
            this.iterateNodeHierarchy(target, themeId);
          }
        };

        _proto.iterateNodeHierarchy = function iterateNodeHierarchy(target, themeId) {
          var children = target.children;
          this.updateTarget(target, themeId);

          for (var _iterator = _createForOfIteratorHelperLoose(children), _step; !(_step = _iterator()).done;) {
            var child = _step.value;
            this.iterateNodeHierarchy(child, themeId);
          }
        };

        _proto.updateTarget = function updateTarget(target, themeId) {
          var colorPalette = target.getComponent(ColorPalette);
          if (colorPalette === null) return;
          colorPalette.updateColor(themeId);
        };

        return ThemeManagement;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targets", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});