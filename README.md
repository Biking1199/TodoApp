# todo アプリの仕様

## タスク管理

const [tasks, setTasks] = useState<Task[]>([]);

●Task オブジェクトの定義  
interface Task {  
 id: string;  
 name: string;  
 term: Date | null;  
}

# 機能

実装した機能について、処理の動きを記述。  
未実装の機能については、処理のイメージを記述。

### 追加ボタン（実装済み、一部問題あり）

1. タスク名、期限(形式：xxxx/yy/zz)でテキストボックスに入力
2. 未完了のステータスにタスクを追加  
   ＊タスクの項目：ID, タスク名, 期限(未完成：<font color="Red">表示に問題あり</font>)

### 削除ボタン　（実装済み）

1. 削除したいタスクのチェックボックスに ✔ をつける
2. 右上の削除ボタンを押す
3. チェックをつけたタスクを削除

### 編集ボタン　（実装済み、一部問題あり）

実装したい処理のイメージ

1. 編集したいチェックボックスに ✔ をつける
2. 右上の編集ボタンを押す
3. ✔ をつけたタスクのタスク名と期限がテキストボックスにそれぞれ表示
4. タスク内容を編集し、保存/キャンセルボタンを押す
5. 保存を押すと、タスクに反映/キャンセルは変更なしで元の状態

### ←/→ ボタン　（実装済み）

タスクのステータス変更のボタン  
タスクは「未完了」「進行中」「完了」の順に横並びになっている。  
→ ボタン：右にステータスが変更される。  
← ボタン：左にステータスが変更される。

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
