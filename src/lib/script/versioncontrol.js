// https://stackoverflow.com/questions/40497262/how-to-version-control-an-object

function VersionControlled(obj, changeLog = []) {
    var targets = [], version = 0, savedLength,
        hash = new Map([[obj, []]]),
        handler = {
            get: function (target, property) {
                var x = target[property];
                if (Object(x) !== x) return x;
                hash.set(x, hash.get(target).concat(property));
                return new Proxy(x, handler);
            },
            set: update,
            deleteProperty: update
        };

    function gotoVersion(newVersion) {
        newVersion = Math.max(0, Math.min(changeLog.length, newVersion));
        var chg, target, path, property,
            val = newVersion > version ? 'newValue' : 'oldValue';
        while (version !== newVersion) {
            if (version > newVersion) version--;
            chg = changeLog[version];
            path = chg.path.slice();
            property = path.pop();
            target = targets[version] ||
                (targets[version] = path.reduce((o, p) => o[p], obj));
            if (chg.hasOwnProperty(val)) {
                target[property] = chg[val];
            } else {
                delete target[property];
            }
            if (version < newVersion) version++;
        }
        return true;
    }

    function gotoLastVersion() {
        return gotoVersion(changeLog.length);
    }

    function update(target, property, value) {
        gotoLastVersion(); // only last version can be modified
        var change = { path: hash.get(target).concat([property]) };
        if (arguments.length > 2) change.newValue = value;
        // Some care concerning the length property of arrays:
        if (Array.isArray(target) && +property >= target.length) {
            savedLength = target.length;
        }
        if (property in target) {
            if (property === 'length' && savedLength !== undefined) {
                change.oldValue = savedLength;
                savedLength = undefined;
            } else {
                change.oldValue = target[property];
            }
        }
        changeLog.push(change);
        targets.push(target);
        return gotoLastVersion();
    }

    this.data = new Proxy(obj, handler);
    this.getVersion = _ => version;
    this.gotoVersion = gotoVersion;
    this.gotoLastVersion = gotoLastVersion;
    this.getChangeLog = _ => changeLog;
    // apply change log
    gotoLastVersion();
}

/*
// sample data
var obj = { list: [1, { p: 'hello' }, 3] };

// Get versioning object for it
var vc = new VersionControlled(obj);
obj = vc.data; // we don't need the original anymore, this one looks the same

// Demo of actions:
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Change text:`);
obj.list[1].p = 'bye';
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Bookmark & add property:`);
var bookmark = vc.getVersion();
obj.list[1].q = ['added'];
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Push on list, then shift:`);
obj.list.push(4); // changes both length and index '4' property => 2 version increments
obj.list.shift(); // several changes and a deletion
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Go to bookmark:`);
vc.gotoVersion(bookmark);

console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Go to last version:`);
vc.gotoLastVersion();
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}. Get change log:`);
var changeLog = vc.getChangeLog();
for (var chg of changeLog) {
    console.log(JSON.stringify(chg));
}

console.log('Restart from scratch, and apply the change log:');
obj = { list: [1, { p: 'hello' }, 3] };
vc = new VersionControlled(obj, changeLog);
obj = vc.data;
console.log(`v${vc.getVersion()} ${JSON.stringify(obj)}`);
*/