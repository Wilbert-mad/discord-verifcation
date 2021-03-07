"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PermissionGard {
    constructor(memberPermissions = [], clientPermissions = [], ops = {}) {
        this.memberPermissions = memberPermissions;
        this.clientPermissions = clientPermissions;
        this.ops = ops;
    }
    check(member) {
        var _a;
        const perms = {
            client: [],
            member: [],
        };
        for (const perm of this.memberPermissions) {
            if (this.ops.checkOwner && member.guild.ownerID === member.user.id) {
                perms.member = [];
                break;
            }
            if (!member.permissions.toArray().includes(perm))
                perms.member.push(perm);
        }
        for (const perm of this.clientPermissions) {
            if (!((_a = member.guild.me) === null || _a === void 0 ? void 0 : _a.permissions.toArray().includes(perm)))
                perms.client.push(perm);
        }
        return {
            perms,
            clientCheck: perms.client.length > 0,
            memberCheck: perms.member.length > 0,
        };
    }
}
exports.default = PermissionGard;
