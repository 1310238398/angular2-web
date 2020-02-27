import { Member } from "./Member";
import { ChoosenItem } from "./ChoosenItem";
export class Union {
    DEPTCODE?: string;
    DEPTNAME?: string;
    IsRoot?: boolean = false;
    CHECKED?: boolean = false; // 是否被选中
    SPREADED?: boolean = false; // 是否展开
    Type?: number = 0; // 0代表该组织下面还有组织，1代表该组织下面是人
    UnionMap?: Map<string, Union> = null;
    MemberMap?: Map<string, Member> = null;

    isChecked?(): boolean {
        return this.CHECKED;
    }

    // 根据id和ChoosenItem的parent list找到左侧对应的对象，标记为未选中
    markItemUncheckedByCodeAndParentList?(code: string, item: ChoosenItem): boolean {
        // 根据parent list从root开始找
        if (this.IsRoot == false) {
            return false;
        }

        // 如果 parent list 为空，最上层
        if (item.ParentList === []) {
            // 个人
            if (item.Type === 1) {
                this.MemberMap.get(code).CHECKED = false;
            } else {
                // 我们把所有该union下面的东西都标记为unchecked
                this.markAllChildUnchecked(this.UnionMap.get(code));
            }
        } else {
            if (item.Type === 1) {
                let union: Union

                // 找到该union
                for (let i = 0; i < item.ParentList.length; ++i) {
                    union = this.UnionMap.get(item.ParentList[i]);
                }
                let finalMember: Member = union.MemberMap.get(code);
                finalMember.CHECKED = false;
            } else {
                let union: Union;
                // 找到该union
                for (let i = 0; i < item.ParentList.length; ++i) {
                    union = this.UnionMap.get(item.ParentList[i]);
                }
                // 我们把所有该union下面的东西都标记为unchecked
                this.markAllChildUnchecked(union.UnionMap.get(code));
            }
        }
    }

    // 将本union之下的所有union以及member标记为unchecked
    markAllChildUnchecked?(unionToUncheck): boolean {
        if (unionToUncheck.Type === 0) {
            unionToUncheck.UnionMap.forEach((union: Union, code: string) => {
                if (union !== null) {
                    union.CHECKED = false;
                    this.markAllChildUnchecked(union);
                }
            });
        } else if (unionToUncheck.Type === 1) {
            unionToUncheck.MemberMap.forEach((member: Member, code: string) => {
                if (member !== null) {
                    member.CHECKED = false;
                }
            });
            return true;
        }
    }


}