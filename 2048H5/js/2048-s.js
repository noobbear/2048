var WFX2048 = new Object();

/**
 * @param {Object} e canvas对象
 * @param {Object} n 创建一个n行n列的图
 * @param {Object} m 每个方块的间距系数，n=4时，推荐m=0.2,n越大，m越小
 * @param {Object} s 显示得分的对象
 */
WFX2048.start = function(e, n, m, s) {
	console.log("2048 正在初始化");
	WFX2048.ctx = e.getContext("2d");
	WFX2048.width = WFX2048.ctx.canvas.width;
	WFX2048.height = WFX2048.ctx.canvas.height;
	WFX2048.box_width = WFX2048.width * 0.8 * (1 / n);
	WFX2048.margin_width = WFX2048.width * 0.2 * m;
	WFX2048.digital = new Array();
	WFX2048.n = n;
	WFX2048.score = 0;
	WFX2048.scoredoc = s;
	WFX2048.init();
	console.log("2048 初始化完毕");
}
WFX2048.init = function() {
	WFX2048.initArr = function() {
		for (var i = 0; i < WFX2048.n; i++) {
			WFX2048.digital[i] = new Array(); //声明二维数组
			for (var j = 0; j < WFX2048.n; j++) {
				WFX2048.digital[i][j] = 0; //给数组赋初值
			}
		}
	}
	WFX2048.initArr();

	WFX2048.drawRect = function(x, y, c) {
		var ctx = WFX2048.ctx;
		WFX2048.ctx.beginPath();
		WFX2048.ctx.fillStyle = c;
		WFX2048.ctx.moveTo(x, y);
		WFX2048.ctx.arcTo(x + WFX2048.box_width, y, x + WFX2048.box_width, y + 1, WFX2048.margin_width * 0.7);
		WFX2048.ctx.arcTo(x + WFX2048.box_width, y + WFX2048.box_width, x + WFX2048.box_width - 1, y + WFX2048.box_width,
			WFX2048.margin_width * 0.7);
		WFX2048.ctx.arcTo(x, y + WFX2048.box_width, x, y + WFX2048.box_width - 1, WFX2048.margin_width * 0.7);
		WFX2048.ctx.arcTo(x, y, x + 1, y, WFX2048.margin_width * 0.7);
		WFX2048.ctx.fill();
	}

	WFX2048.drawBack = function() {
		WFX2048.ctx.beginPath();
		WFX2048.ctx.fillStyle = "#bbada0";
		WFX2048.ctx.fillRect(0, 0, WFX2048.width, WFX2048.height);
		for (var i = 0; i < WFX2048.n; i++) {
			for (var j = 0; j < WFX2048.n; j++) {
				var c = "";
				if (WFX2048.digital[i][j] == 0) {
					c = "#cdc0b4 ";
				}
				if (WFX2048.digital[i][j] == 2) {
					c = "#eee4da ";
				}
				if (WFX2048.digital[i][j] == 4) {
					c = "#ede0c8";
				}
				if (WFX2048.digital[i][j] == 8) {
					c = "#f2b179";
				}
				if (WFX2048.digital[i][j] == 16) {
					c = "#f59563";
				}
				if (WFX2048.digital[i][j] == 32) {
					c = "#f67c5f";
				}
				if (WFX2048.digital[i][j] == 64) {
					c = "#f65e3b";
				}
				if (WFX2048.digital[i][j] == 128) {
					c = "#f27f0c";
				}
				if (WFX2048.digital[i][j] == 256) {
					c = "#edcc61";
				}
				if (WFX2048.digital[i][j] == 512) {
					c = "#edc850";
				}
				if (WFX2048.digital[i][j] == 1024) {
					c = "#eca850";
				}
				if (WFX2048.digital[i][j] == 2048) {
					c = "#dec2a0";
				}
				x = WFX2048.margin_width + i * (WFX2048.box_width + WFX2048.margin_width);
				y = WFX2048.margin_width + j * (WFX2048.box_width + WFX2048.margin_width);
				WFX2048.drawRect(x, y, c);
			}
		}
	}

	WFX2048.hasZero = function() {
		for (var i = 0; i < WFX2048.n; i++) {
			for (var j = 0; j < WFX2048.n; j++) {
				if (WFX2048.digital[i][j] == 0) {
					return true;
				}
			}
		}
		return false;
	}

	WFX2048.createRandom = function() {
		var x = Math.round(Math.random() * (WFX2048.n - 1));
		var y = Math.round(Math.random() * (WFX2048.n - 1));
		if (!WFX2048.hasZero())
			return;
		if (WFX2048.digital[x][y] == 0) {
			var r = Math.random() * 100 > 80 ? 4 : 2;
			WFX2048.digital[x][y] = r;
		} else {
			WFX2048.createRandom();
		}
	}

	WFX2048.drawDigital = function() {
		for (var i = 0; i < WFX2048.n; i++) {
			for (var j = 0; j < WFX2048.n; j++) {
				if (WFX2048.digital[i][j] > 0) {
					WFX2048.ctx.beginPath();
					WFX2048.ctx.textAlign = "center";
					WFX2048.ctx.textBaseline = "middle";
					if (WFX2048.digital[i][j] > 4)
						WFX2048.ctx.fillStyle = "#f9f6f2";
					else
						WFX2048.ctx.fillStyle = "#776e65";
					WFX2048.ctx.font = "40px Arial";
					x = WFX2048.margin_width + i * (WFX2048.box_width + WFX2048.margin_width) + WFX2048.box_width / 2;
					y = WFX2048.margin_width + j * (WFX2048.box_width + WFX2048.margin_width) + WFX2048.box_width / 2;
					WFX2048.ctx.fillText(WFX2048.digital[i][j], x, y);
				}
			}
		}
	}
	WFX2048.createRandom();
	WFX2048.createRandom();
	WFX2048.createRandom();
	WFX2048.drawBack();
	WFX2048.drawDigital();

	WFX2048.moveNumsTo = function(d) { //需清楚arra[0]指向第一列
		switch (d) {
			case DIRECTION.L:
				//向左移动所有数字 
				for (var i = 0; i < WFX2048.n; i++) {
					var arr = new Array();
					for (var j = 0; j < WFX2048.n; j++) {
						arr[j] = WFX2048.digital[j][i];
					}
					arr = WFX2048.move(arr, true);
					for (var j = 0; j < WFX2048.n; j++) {
						WFX2048.digital[j][i] = arr[j];
					}
				}
				break;
			case DIRECTION.U:
				//向上移动所有数字
				for (var i = 0; i < WFX2048.n; i++) {
					var arr = WFX2048.digital[i];
					arr = WFX2048.move(arr, true);
					for (var j = 0; j < WFX2048.n; j++) {
						WFX2048.digital[i][j] = arr[j];
					}
				}
				break;
			case DIRECTION.R:
				//向右移动所有数字
				for (var i = 0; i < WFX2048.n; i++) {
					var arr = new Array();
					for (var j = 0; j < WFX2048.n; j++) {
						arr[j] = WFX2048.digital[j][i];
					}
					arr = WFX2048.move(arr, false);
					for (var j = 0; j < WFX2048.n; j++) {
						WFX2048.digital[j][i] = arr[j];
					}
				}
				break;
			default: //DIRECTION.D
				//向下移动所有数字
				for (var i = 0; i < WFX2048.n; i++) {
					var arr = WFX2048.digital[i];
					arr = WFX2048.move(arr, false);
					for (var j = 0; j < WFX2048.n; j++) {
						WFX2048.digital[i][j] = arr[j];
					}
				}
				break;
		}
	}
	var moved = false;

	WFX2048.move = function(a, toStart) {
		if (toStart) { // 向数组头部靠拢
			var t = 0;
			for (var i = 0; i < a.length; i++) {
				if (a[i] == 0)
					continue;
				else { // 非0
					// 向后找到一个非0数尝试合并
					var j = i;
					if (j + 1 < a.length) {
						for (j = i + 1; j < a.length - 1; j++) {
							if (a[j] == 0)
								continue;
							else
								break;
						}
					}
					// 如果找到了，就合并
					if (j > i && j < a.length && a[i] == a[j]) {
						a[i] += a[i];
						a[j] = 0;
						moved = true;
						WFX2048.score += a[i];
					}
					if (a[i] != 0 && i != t) {
						a[t++] = a[i];
						a[i] = 0;
						moved = true;
					} else {
						t++;
					}

				}
			}
		} else { // 向数组尾部靠拢
			var t = a.length - 1;
			for (var i = a.length - 1; i >= 0; i--) {
				if (a[i] == 0)
					continue;
				else { // 非0
					// 向前找到一个非0数尝试合并
					var j = a.length - 1;
					if (j - 1 >= 0) {
						for (j = i - 1; j >= 0; j--) {
							if (a[j] == 0)
								continue;
							else
								break;
						}
					}
					// 如果找到了，就合并
					if (j < i && j >= 0 && a[i] == a[j]) {
						a[i] += a[i];
						a[j] = 0;
						moved = true;
						WFX2048.score += a[i];
					}
					if (a[i] != 0 && i != t) {
						a[t--] = a[i];
						a[i] = 0;
						moved = true;
					} else {
						t--;
					}
				}
			}
		}
		return a;
	}

	function checkOver() {
		for (var i = 0; i < WFX2048.n - 1; i++) {
			for (var j = 0; j < WFX2048.n - 1; j++) {
				if (WFX2048.digital[i][j] == 0 || WFX2048.digital[i+1][j]==0 || WFX2048.digital[i][j+1]==0 || WFX2048.digital[
						i][j] == WFX2048.digital[i + 1][j] ||
					WFX2048.digital[i][j] == WFX2048.digital[i][j + 1]) {
					return false;
				}
			}
		}
		console.log(WFX2048.digital);
		return true;
	}
	document.onkeydown = function(event) {
		if (checkOver()) {
			if (confirm("GAME OVER!是否重新开始？？？")) {
				alert("重新开始！");
				WFX2048.ctx.clearRect(0, 0, WFX2048.ctx.width, WFX2048.ctx.height);
				WFX2048.initArr();
				WFX2048.score = 0;
				WFX2048.createRandom();
				WFX2048.createRandom();
				WFX2048.createRandom();
				WFX2048.drawBack();
				WFX2048.drawDigital();
			} else
				return;
		}
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 37) { //向左移动
			WFX2048.moveNumsTo(DIRECTION.L);
		} else if (e && e.keyCode == 38) { //向上移动
			WFX2048.moveNumsTo(DIRECTION.U);
		} else if (e && e.keyCode == 39) { //向右移动
			WFX2048.moveNumsTo(DIRECTION.R);
		} else if (e && e.keyCode == 40) { //向下移动
			WFX2048.moveNumsTo(DIRECTION.D);
		}
		if (WFX2048.scoredoc) {
			WFX2048.scoredoc.innerHTML = WFX2048.score;
		}
		WFX2048.ctx.clearRect(0, 0, WFX2048.width, WFX2048.height);
		if (moved)
			WFX2048.createRandom();
		moved = false;
		WFX2048.drawBack();
		WFX2048.drawDigital();
	}

}
var DIRECTION = function() {}
DIRECTION.L = -1;
DIRECTION.U = 0;
DIRECTION.R = 1;
DIRECTION.D = 2;
