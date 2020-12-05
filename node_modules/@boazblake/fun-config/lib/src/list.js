'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = undefined;

var _data = require('data.maybe');

var _ramda = require('ramda');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nil = function Nil() {
  _classCallCheck(this, Nil);

  this.head = undefined;
  this.tail = undefined;
  this.isNil = true;
  this.isCons = false;
};

var Cons = function Cons(x, xs) {
  _classCallCheck(this, Cons);

  this.head = x;
  this.tail = xs;
  this.isNil = false;
  this.isCons = true;
};

//curry :: (a -> b -> c) -> a -> b -> c


var curry = function curry(f) {
  return function (x) {
    return function (y) {
      return f(x, y);
    };
  };
};

//uncurry :: (a -> b -> c) -> (a, b) -> c
var uncurry = function uncurry(f) {
  return function (x, y) {
    return f(x)(y);
  };
};

//o :: ((b -> c), (a -> b)) -> a -> c
var o = function o(f, g) {
  return function (x) {
    return f(g(x));
  };
};

//id :: a -> a
var id = function id(x) {
  return x;
};

//flip :: (a -> b -> c) -> (b, a) -> c
var flip = function flip(f) {
  return function (x, y) {
    return f(y, x);
  };
};

//cons :: (a, List a) -> List a
var cons = function cons(x, xs) {
  return new Cons(x, xs);
};

//snoc :: (List a, a) -> List a
var snoc = function snoc(xs, x) {
  return new Cons(x, xs);
};

//ccons :: a -> List a -> List a
var ccons = curry(cons);

//csnoc :: List a -> a -> List a
//const csnoc = curry(snoc)

//nil :: () => List a
var nil = function nil() {
  return new Nil();
};

//head :: List a -> a | undefined
var head = function head(_ref) {
  var head = _ref.head;
  return head;
};

//tail :: List a -> List a | undefined
var tail = function tail(_ref2) {
  var tail = _ref2.tail;
  return tail;
};

//concat :: List a -> List a -> List a
var concat = function concat(xs) {
  return function (ys) {
    return foldr(cons)(ys)(xs);
  };
};

//foldl :: ((a, b) -> a) -> a -> List b -> a
var foldl = function foldl(f) {
  var go = function go(b) {
    return function (_ref3) {
      var isNil = _ref3.isNil,
          head = _ref3.head,
          tail = _ref3.tail;
      return isNil ? b : go(f(b, head))(tail);
    };
  };
  return go;
};

//foldr :: ((a, b) -> a) -> a -> List b -> a
var foldr = function foldr(f) {
  return function (b) {
    var rev = function rev(acc) {
      return function (_ref4) {
        var isNil = _ref4.isNil,
            head = _ref4.head,
            tail = _ref4.tail;
        return isNil ? acc : rev(cons(head, acc))(tail);
      };
    };

    return o(foldl(flip(f))(b), rev(nil()));
  };
};

//foldMap :: Monoid m => (a -> m) -> List a -> m
var foldMap = function foldMap(f) {
  return foldl(function (acc, x) {
    return (acc || f(x).empty()).concat(f(x));
  })(null);
};

//foldM :: Monad m => (a -> m a) -> (a -> b -> m a) -> a -> List b -> m a
var foldM = function foldM(point) {
  return function (f) {
    var go = function go(a) {
      return function (_ref5) {
        var isNil = _ref5.isNil,
            head = _ref5.head,
            tail = _ref5.tail;
        return isNil ? point(a) : f(a, head).chain(function (x) {
          return go(x)(tail);
        });
      };
    };
    return go;
  };
};

//map :: (a -> b) -> List a -> List b
var map = function map(f) {
  return function (_ref6) {
    var isNil = _ref6.isNil,
        head = _ref6.head,
        tail = _ref6.tail;
    return isNil ? nil() : cons(f(head), map(f)(tail));
  };
};

//ap :: List (a -> b) -> List a -> List b
var ap = function ap(_ref7) {
  var isNil = _ref7.isNil,
      f = _ref7.head,
      fs = _ref7.tail;
  return function (xs) {
    return isNil ? nil() : concat(map(f)(xs))(ap(fs)(xs));
  };
};

//pure :: a -> List a
var pure = function pure(a) {
  return cons(a, nil());
};

//chain :: (a -> List b) -> List a -> List b
var chain = function chain(_ref8) {
  var isNil = _ref8.isNil,
      head = _ref8.head,
      tail = _ref8.tail;
  return function (f) {
    return isNil ? nil() : concat(f(head))(chain(tail)(f));
  };
};

//join :: List (List a -> List a)
var join = foldr(uncurry(concat))(nil());

//traverse :: Applicative f => (a -> f a) -> (a -> f b) -> List a -> f (List b)
var traverse = function traverse(point, f) {
  var con_f = function con_f(x, ys) {
    return f(x).map(ccons).ap(ys);
  };

  return foldr(con_f)(point(nil()));
};

//sequenceA :: Applicative f => (a -> f a) -> List (f a) -> f (List a)
var sequenceA = function sequenceA(point) {
  return traverse(point, id);
};

//length :: List a -> Int
var length = function length(xs) {
  var go = function go(b) {
    return function (_ref9) {
      var isCons = _ref9.isCons,
          tail = _ref9.tail;
      return isCons ? go(b + 1)(tail) : b;
    };
  };

  return go(0)(xs);
};

//findIndex :: (a -> Boolean) -> List a -> Maybe Int
var findIndex = function findIndex(f) {
  return function (xs) {
    var go = function go(n) {
      return function (_ref10) {
        var isNil = _ref10.isNil,
            head = _ref10.head,
            tail = _ref10.tail;
        return isNil ? (0, _data.Nothing)() : f(head) ? (0, _data.Just)(n) : go(n + 1)(tail);
      };
    };

    return go(0)(xs);
  };
};

//index :: Int -> List a -> Maybe a
var index = function index(i) {
  return function (xs) {
    var go = function go(n) {
      return function (_ref11) {
        var isNil = _ref11.isNil,
            head = _ref11.head,
            tail = _ref11.tail;
        return isNil ? (0, _data.Nothing)() : n === i ? (0, _data.Just)(head) : go(n + 1)(tail);
      };
    };
    return go(0)(xs);
  };
};

//reverse :: List a -> List a
var reverse = function reverse(xs) {
  var go = function go(acc) {
    return function (_ref12) {
      var isNil = _ref12.isNil,
          head = _ref12.head,
          tail = _ref12.tail;
      return isNil ? acc : go(cons(head, acc))(tail);
    };
  };

  return go(nil())(xs);
};

//contains :: Eq a => List a -> a -> Boolean
var contains = function contains(xs) {
  return function (x) {
    return findIndex((0, _ramda.equals)(x))(xs).isJust;
  };
};

//unique :: Eq a => List a -> List a
var unique = o(reverse, foldl(function (acc, x) {
  return contains(acc)(x) ? acc : cons(x, acc);
})(nil()));

//toArray :: List a -> [a]
var toArray = foldl(function (acc, x) {
  return acc.concat([x]);
})([]);

//toList :: [a] -> List a
var toList = function toList(xs) {
  return xs.reduceRight(function (acc, x) {
    return cons(x, acc);
  }, nil());
};

//List :: a -> ... -> List a
var list = function list() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return toList(args);
};

var List = exports.List = {
  list: list,
  cons: cons,
  snoc: snoc,
  nil: nil,
  head: head,
  tail: tail,
  foldl: foldl,
  foldr: foldr,
  foldMap: foldMap,
  foldM: foldM,
  concat: concat,
  map: map,
  ap: ap,
  pure: pure,
  join: join,
  chain: chain,
  traverse: traverse,
  sequenceA: sequenceA,
  findIndex: findIndex,
  index: index,
  length: length,
  reverse: reverse,
  contains: contains,
  unique: unique,
  toArray: toArray,
  toList: toList
};
//# sourceMappingURL=list.js.map