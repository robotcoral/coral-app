import json
import sys
from datetime import date
import re


def throw_error(text):
    print("❌ ERROR: " + text)
    sys.exit(1)


def detect_version(argv):
    if len(argv) > 1:
        version_string = argv[1]
        version_string = version_string.lower()
        print('Version in argv: "{}"'.format(repr(version_string)))
        if (
            not (re.match("^[0-9]+\.[0-9]+\.[0-9]+$", version_string) is None)
            or version_string == "nightly"
        ):
            valid = True
        else:
            valid = False

        if not (valid):
            throw_error("Version doesn't match required format")

        print('✅ Detected version: VERSION "{}"'.format(version_string))

        if version_string == "nightly":
            return "nightly.{}".format(str(date.today()))
        else:
            return_version = list(map(int, version_string.split(".")))
            return "{}.{}.{}".format(
                return_version[0], return_version[1], return_version[2]
            )

    else:
        throw_error("No command line argument detected")


def new_version_greater(new_ver, old_ver):
    if (
        not re.match(
            "^[0-9]+\.[0-9]+\.[0-9]+\+nightly\.[0-9]{4}-[0-9]{2}-[0-9]{2}$",
            old_ver
        )
        is None
    ):
        old_ver = old_ver[: old_ver.find("+")]

    new_ver = list(map(int, new_ver.split(".")))
    old_ver = list(map(int, old_ver.split(".")))
    for i in range(0, 3):
        if new_ver[i] > old_ver[i]:
            return True

    return False


def get_new_version(new_ver, old_ver, nightly):
    if nightly is True:
        if (
            re.match(
                "^[0-9]+\.[0-9]+\.[0-9]+\+nightly\.[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                old_ver
            )
            is None
        ):
            return "{}+{}".format(old_ver, new_ver)
        else:
            return "{}+{}".format(old_ver[: old_ver.find("+")], new_ver)
    else:
        return new_ver


def bump_package_json(version, nightly):
    print("> Loading package.json")
    with open("./package.json", "r") as f:
        packagejson_dict = json.load(f)

    packagejson_ver = packagejson_dict["version"]

    print("Old Version: " + packagejson_ver)
    version = get_new_version(version, packagejson_ver, nightly)
    print("New Version: " + version)

    if nightly is False:
        check_version = new_version_greater(version, packagejson_ver)
    else:
        check_version = True

    if not (check_version):
        throw_error("New version is <= old version")

    packagejson_dict["version"] = version

    print("> Writing to package.json")
    with open("./package.json", "w") as f:
        f.write(json.dumps(packagejson_dict, indent=2) + "\n")

    print("✅ SUCCESS")


def bump_package_lock_json(version, nightly):
    print("\n> Loading package-lock.json")
    with open("./package-lock.json", "r") as f:
        packagelockjson_dict = json.load(f)

    packagelockjson_ver = packagelockjson_dict["version"]

    print("Old Version: " + packagelockjson_ver)
    version = get_new_version(version, packagelockjson_ver, nightly)
    print("New Version: " + version)

    if nightly is False:
        check_version = new_version_greater(version, packagelockjson_ver)
    else:
        check_version = True

    if not (check_version):
        throw_error("New version is <= old version")

    packagelockjson_dict["version"] = version
    packagelockjson_dict["packages"][""]["version"] = version

    print("> Writing to package-lock.json")
    with open("./package-lock.json", "w") as f:
        f.write(json.dumps(packagelockjson_dict, indent=2) + "\n")

    print("✅ SUCCESS")


def bump_environment_common_ts(version, nightly):
    print("\n> Loading environment.common.ts")
    with open("./src/environments/environment.common.ts", "r") as f:
        file = f.read()

    begin_version_line = file.find("version: \"")
    begin_version = begin_version_line + len("version: \"")
    end_version = file.find("\"", begin_version)
    env_com_version = file[begin_version:end_version]

    print("Old Version: " + env_com_version)
    version = get_new_version(version, env_com_version, nightly)
    print("New Version: " + version)

    if nightly is False:
        check_version = new_version_greater(version, env_com_version)
    else:
        check_version = True

    if not (check_version):
        throw_error("New version is <= old version")

    with open("./src/environments/environment.common.ts", "w") as f:
        f.write(file[0:begin_version] + version + file[end_version:])

    print("✅ SUCCESS")


def bump_version(version, nightly):
    bump_package_json(version, nightly)
    bump_package_lock_json(version, nightly)
    bump_environment_common_ts(version, nightly)


if __name__ == "__main__":
    print("### Robot Coral CI ###\n")

    print("---Loading new version number---")

    version = detect_version(sys.argv)

    print("\n---Bumping versions---")

    print("{}\n".format(version))
    if version[:7] == "nightly":
        bump_version(version, True)
    else:
        bump_version(version, False)

    print("\n----------")
    print("\n✅ SUCCESS")
