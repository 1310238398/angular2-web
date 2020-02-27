export class ChoosenItem {
    Type: number = 0; // 0代表是一个组织，1代表是一个人
    Name: string = ""; // 展示在界面上的name
    ParentList: string[] = []; // 代表它的父节点们，依次为 root 祖父节点 父节点
}

// export class C