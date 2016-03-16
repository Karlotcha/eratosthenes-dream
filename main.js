$('body').append('<canvas id="canvas" width="1000" height="1000" style="border:1px solid red;"></canvas>')

// global variables
var canvas_size  = 1000
  , limit        = 1000 // try 10, 100, 1000
  , cell_size    = canvas_size / limit

// Cell
function Cell (x, y) {
  ctx.fillStyle = 'blue'
  ctx.fill()
  ctx.fillRect(cell_size * x, cell_size * y, cell_size, cell_size)
}

// Sieve of Eratosthenes
function sieve() {
  var sieve  = []
    , primes = []
    , limit_square = limit * limit

  sieve[0] = false
  sieve[1] = false

  for (var i = 2; i < limit; i++) {
    if (sieve[i] == undefined) {
      // primes.push(i)
      var marker = 2*i

      while (marker < limit_square) {
        sieve[marker] = false
        marker += i
      }
    } else { continue }
  }

  // for (var i = limit; i < limit_square; i++) {
  //    if (sieve[i] == undefined) { primes.push(i) }
  // }

  return sieve
}

var c      = document.getElementById("canvas")
  , ctx    = c.getContext("2d")
  , width  = c.width
  , height = c.height
  , core_x = width/2
  , core_y = height/2
  , sieve  = sieve()
  , n      = sieve.length

// for (var i = 2; i < n; i++) {
//   if (sieve[i] == undefined) {
//     console.log(i)
//     new Cell(i%limit ,Math.floor(i/limit))
//   }
// }

var m_x = limit/2
  , m_y = limit/2
  , k = 1
  , m = 1
  , direction = 1

new Cell(m_x ,m_y)

for (var i = 1; i < n; i++) {
  if (sieve[i] == undefined) {
    new Cell(m_x, m_y)
  }

  // TODO - improve this logic
  if (direction == 1) {
    m_y -= 1
  } else if (direction == 2) {
    m_x += 1
  } else if (direction == 3) {
    m_y += 1
  } else {
    m_x -= 1
  }

  if (k == m) {
    direction = (direction + 1) % 4
    if (direction % 2 == 0) { m +=1 }
    k = 0
  }

  k += 1
}
