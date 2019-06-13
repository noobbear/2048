package wfx.jar2048.core;

public final class Core {

	public static boolean tryMoveNumber(int[] a, boolean toStart) {
		boolean moved = false;
		if (toStart) {// 向数组头部靠拢
			int t = 0;
			for (int i = 0; i < a.length; i++) {
				if (a[i] == 0)
					continue;
				else {// 非0
						// 向后找到一个非0数尝试合并
					int j = i;
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
		} else {// 向数组尾部靠拢
			int t = a.length - 1;
			for (int i = a.length - 1; i >= 0; i--) {
				if (a[i] == 0)
					continue;
				else {// 非0
						// 向前找到一个非0数尝试合并
					int j = a.length - 1;
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
		return moved;
	}

	public static int[] moveNumber(int[] a, boolean toStart) {
		if (toStart) {// 向数组头部靠拢
			int t = 0;
			for (int i = 0; i < a.length; i++) {
				if (a[i] == 0)
					continue;
				else {// 非0
						// 向后找到一个非0数尝试合并
					int j = i;
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
					}
					if (a[i] != 0 && i != t) {
						a[t++] = a[i];
						a[i] = 0;
					} else {
						t++;
					}

				}
			}
		} else {// 向数组尾部靠拢
			int t = a.length - 1;
			for (int i = a.length - 1; i >= 0; i--) {
				if (a[i] == 0)
					continue;
				else {// 非0
						// 向前找到一个非0数尝试合并
					int j = a.length - 1;
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
					}
					if (a[i] != 0 && i != t) {
						a[t--] = a[i];
						a[i] = 0;
					} else {
						t--;
					}
				}
			}
		}
		return a;
	}

	public static int[][] changeSwitchDirection(int[][] nums, DIRECTION dir) {
		switch (dir) {
		case LEFT:
			// 向左移动所有数字
			for (int i = 0; i < 4; i++) {
				int[] arr = new int[nums.length];
				arr[0] = nums[0][i];
				arr[1] = nums[1][i];
				arr[2] = nums[2][i];
				arr[3] = nums[3][i];
				arr = moveNumber(arr, true);
				nums[0][i] = arr[0];
				nums[1][i] = arr[1];
				nums[2][i] = arr[2];
				nums[3][i] = arr[3];
			}
			break;
		case UP:
			// 向上移动所有数字
			for (int i = 0; i < 4; i++) {
				int[] arr = new int[nums.length];
				arr = moveNumber(arr, true);
				nums[i][0] = arr[0];
				nums[i][1] = arr[1];
				nums[i][2] = arr[2];
				nums[i][3] = arr[3];
			}
			break;
		case RIGHT:
			// 向右移动所有数字
			for (int i = 0; i < 4; i++) {
				int[] arr = new int[nums.length];
				arr[0] = nums[0][i];
				arr[1] = nums[1][i];
				arr[2] = nums[2][i];
				arr[3] = nums[3][i];
				arr = moveNumber(arr, false);
				nums[0][i] = arr[0];
				nums[1][i] = arr[1];
				nums[2][i] = arr[2];
				nums[3][i] = arr[3];
			}
			break;
		default:
			// 向下移动所有数字
			for (int i = 0; i < 4; i++) {
				int[] arr = new int[nums.length];
				arr = moveNumber(arr, false);
				nums[i][0] = arr[0];
				nums[i][1] = arr[1];
				nums[i][2] = arr[2];
				nums[i][3] = arr[3];
			}
			break;
		}
		return nums;
	}
	public static boolean tryChangeSwitchDirection(int[][] nums, DIRECTION dir) {
		boolean moved = false;
		switch (dir) {
		case LEFT:
			// 向左移动所有数字
			for (int i = 0; i < 4; i++) {
				int[] arr = new int[nums.length];
				arr[0] = nums[0][i];
				arr[1] = nums[1][i];
				arr[2] = nums[2][i];
				arr[3] = nums[3][i];
				moved = tryMoveNumber(arr, true);
				nums[0][i] = arr[0];
				nums[1][i] = arr[1];
				nums[2][i] = arr[2];
				nums[3][i] = arr[3];
			}
			break;
		case UP:
			// 向上移动所有数字
			for (int i = 0; i < 4; i++) {
				int[] arr = new int[nums.length];
				moved = tryMoveNumber(arr, true);
				nums[i][0] = arr[0];
				nums[i][1] = arr[1];
				nums[i][2] = arr[2];
				nums[i][3] = arr[3];
			}
			break;
		case RIGHT:
			// 向右移动所有数字
			for (int i = 0; i < 4; i++) {
				int[] arr = new int[nums.length];
				arr[0] = nums[0][i];
				arr[1] = nums[1][i];
				arr[2] = nums[2][i];
				arr[3] = nums[3][i];
				moved = tryMoveNumber(arr, true);
				nums[0][i] = arr[0];
				nums[1][i] = arr[1];
				nums[2][i] = arr[2];
				nums[3][i] = arr[3];
			}
			break;
		default:
			// 向下移动所有数字
			for (int i = 0; i < 4; i++) {
				int[] arr = new int[nums.length];
				moved = tryMoveNumber(arr, true);
				nums[i][0] = arr[0];
				nums[i][1] = arr[1];
				nums[i][2] = arr[2];
				nums[i][3] = arr[3];
			}
			break;
		}
		return moved;
	}
	public static boolean checkOver(int[][] nums) {
		for (int i = 0; i < nums.length-1; i++) {
			for (int j = 0; j < nums.length-1; j++) {
				if (nums[i][j] == 0 || nums[i + 1][j] == 0 || nums[i][j + 1] == 0 || nums[i][j] == nums[i + 1][j] ||
						nums[i][j] == nums[i][j + 1]) {
					return false;
				}
			}
		}
		return true;
	}
	public static boolean hasZero(int[][] nums) {
		for (int i = 0; i < nums.length; i++) {
			for (int j = 0; j < nums.length; j++) {
				if (nums[i][j] == 0) {
					return true;
				}
			}
		}
		return false;
	}

	public static int[][] createRandom(int[][] nums) {
		int x = (int) Math.round(Math.random()* nums.length);
		int y = (int) Math.round(Math.random() * nums.length);
		if (!hasZero(nums))
			return nums;
		if (nums[x][y] == 0) {
			int r = Math.random() * 100 > 80 ? 4 : 2;
			nums[x][y] = r;
		} else {
			createRandom(nums);
		}
		return nums;
	}
	public static void main(String[] args) {

		/*
		 * int[] b = { 2, 8, 4, 0 }; System.out.println(tryMoveNumber(b, true)); for
		 * (int i : b) { System.out.print(i); }
		 */
		int x = (int) Math.round(Math.random()*3);
		int y = (int) Math.round(Math.random()*3);
		System.out.println(x+","+y);
	}

}
