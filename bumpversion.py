import json
import sys


def throw_error(text):
    print("❌ ERROR: " + text)
    sys.exit(1)


def detect_version(argv):
    if(len(argv) > 1):
        version_string = argv[1]
        version_string = version_string.lower()
        print("Version in argv: \"{}\"".format(version_string))
        valid = True
        # if(version_string[0] == "v"):
        #     version_string_split = version_string[1:].split(".")
        #     if(len(version_string_split) == 3):
        #         for i in range(0, 3):
        #             if(not(version_string_split[i].isdigit())):
        #                 valid = False
        #             elif(not(str(int(version_string_split[i]))
        #                      == version_string_split[i])):
        #                 valid = False
        #     else:
        #         valid = False
        # else:
        version_string_split = version_string.split(".")
        if(len(version_string_split) == 3):
            for i in range(0, 3):
                if(not(version_string_split[i].isdigit())):
                    valid = False
                elif(not(str(int(version_string_split[i]))
                         == version_string_split[i])):
                    valid = False
        else:
            valid = False

        if not(valid):
            throw_error("Version doesn't match required format")

        print("✅ Detected version: VERSION \"{}\"".format(version_string[1:]))

        if(version_string[0] == "v"):
            return version_string[1:]
        else:
            return version_string

    else:
        throw_error("No command line argument detected")


def new_version_greater(new_ver, old_ver):
    new_ver = map(int, new_ver.split("."))
    old_ver = map(int, old_ver.split("."))
    for i in range(0, 3):
        if(new_ver[i] > old_ver[i]):
            return True

    return False


def bump_package_json(version):
    print("> Loading package.json")
    with open("./package.json", "r") as f:
        packagejson_dict = json.load(f)

    packagejson_ver = packagejson_dict["version"]

    print("Old Version: " + packagejson_ver)
    print("New Version: " + version)

    check_version = new_version_greater(version, packagejson_ver)

    if(not(check_version)):
        throw_error("New version is <= old version")

    packagejson_dict["version"] = version

    print("> Writing to package.json")
    with open("./package.json", "w") as f:
        f.write(json.dumps(packagejson_dict, indent=2)+"\n")

    print("✅ SUCCESS")


def bump_package_lock_json(version):
    print("\n> Loading package-lock.json")
    with open("./package-lock.json", "r") as f:
        packagelockjson_dict = json.load(f)

    packagelockjson_ver = packagelockjson_dict["version"]

    print("Old Version: " + packagelockjson_ver)
    print("New Version: " + version)

    check_version = new_version_greater(version, packagelockjson_ver)

    if(not(check_version)):
        throw_error("New version is <= old version")

    packagelockjson_dict["version"] = version
    packagelockjson_dict["packages"][""]["version"] = version

    print("> Writing to package-lock.json")
    with open("./package-lock.json", "w") as f:
        f.write(json.dumps(packagelockjson_dict, indent=2)+"\n")

    print("✅ SUCCESS")


def bump_environment_common_ts(version):
    print("\n> Loading environment.common.ts")
    with open("./src/environments/environment.common.ts", "r") as f:
        file = f.read()

    begin_version_line = file.find("version: '")
    begin_version = begin_version_line+len("version: '")
    end_version = file.find("'", begin_version)
    env_com_version = file[begin_version:end_version]

    print("Old Version: " + env_com_version)
    print("New Version: " + version)

    check_version = new_version_greater(version, env_com_version)

    if(not(check_version)):
        throw_error("New version is <= old version")

    with open("./src/environments/environment.common.ts", "w") as f:
        f.write(file[0:begin_version] + version + file[end_version:])

    print("✅ SUCCESS")


def bump_documentation(version):
    print("\n> Loading conf.py")
    with open("./docs/source/conf.py", "r") as f:
        file = f.read()

    begin_version_line = file.find("release = '")
    begin_version = begin_version_line+len("release = '")
    end_version = file.find("'", begin_version)
    env_com_version = file[begin_version:end_version]

    print("Old Version: " + env_com_version)
    print("New Version: " + version)

    check_version = new_version_greater(version, env_com_version)

    if(not(check_version)):
        throw_error("New version is <= old version")

    with open("./docs/source/conf.py", "w") as f:
        f.write(file[0:begin_version] + version + file[end_version:])

    print("✅ SUCCESS")


def bump_version(version):
    bump_package_json(version)
    bump_package_lock_json(version)
    bump_environment_common_ts(version)
    bump_documentation(version)


if __name__ == "__main__":
    print("### Robot Coral CI ###\n")

    print("---Loading new version number---")

    version = detect_version(sys.argv)

    print("\n---Bumping versions---")

    print(version)
    bump_version(version)

    print("\n----------")
    print("\n✅ SUCCESS")
