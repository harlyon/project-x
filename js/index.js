var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      recentData: [],
      alltimeData: [],
      active: 'recent'
    };
    _this.handleSort = _this.handleSort.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function (raw) {
        return raw.json();
      }).then(function (data) {
        _this2.setState({
          recentData: data
        });
      });

      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(function (raw) {
        return raw.json();
      }).then(function (data) {
        _this2.setState({
          alltimeData: data
        });
      });
    }
  }, {
    key: 'handleSort',
    value: function handleSort(e) {
      var type = e.target.getAttribute('value');
      this.setState({ active: type });
    }
  }, {
    key: 'render',
    value: function render() {
      var active = this.state.active;
      var data = this.state.active === 'recent' ? this.state.recentData : this.state.alltimeData;
      return React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'table',
          null,
          React.createElement(
            'caption',
            null,
            'Free Code Camp Leader Board'
          ),
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                { className: 'num' },
                '#'
              ),
              React.createElement(
                'th',
                { className: 'col-left' },
                'Camper Name'
              ),
              React.createElement(
                'th',
                { className: 'sort',
                  onClick: this.handleSort,
                  value: 'alltime' },
                'All time points',
                active === 'alltime' ? '▼' : ''
              ),
              React.createElement(
                'th',
                { className: 'sort',
                  onClick: this.handleSort,
                  value: 'recent' },
                'Points in past 30 days',
                active === 'recent' ? '▼' : ''
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            data.map(function (val, i) {
              return React.createElement(
                'tr',
                { key: i },
                React.createElement(
                  'td',
                  { className: 'num' },
                  i + 1,
                  '.'
                ),
                React.createElement(
                  'td',
                  { className: 'col-left' },
                  React.createElement('img', { src: val.img, alt: 'profile pic' }),
                  val.username
                ),
                React.createElement(
                  'td',
                  null,
                  val.alltime
                ),
                React.createElement(
                  'td',
                  null,
                  val.recent
                )
              );
            })
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));