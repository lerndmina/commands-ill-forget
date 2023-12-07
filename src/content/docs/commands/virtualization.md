---
title: Virtualization
description: Commands About Virtualization.
---
```md
TODO: Add description
```

### Print iommu groups:
Prints out all iommu groups on the system, this can be useful if you are trying to see if you need to remap them for pcie passthough.
```bash
shopt -s nullglob
for g in $(find /sys/kernel/iommu_groups/* -maxdepth 0 -type d | sort -V); do
    echo "IOMMU Group ${g##*/}:"
    for d in $g/devices/*; do
        echo -e "\t$(lspci -nns ${d##*/})"
    done;
done;
```
`shopt -s nullglob`: This command sets the nullglob option in bash, which changes the behavior of bash when no files match a glob pattern to return an empty string rather than the pattern itself.

`for g in $(find /sys/kernel/iommu_groups/* -maxdepth 0 -type d | sort -V); do`: This starts a loop over each IOMMU group. The `find` command is used to list all directories in `/sys/kernel/iommu_groups/`, and `sort -V` sorts the output in version number order.

`echo "IOMMU Group ${g##*/}:"`: This prints the name of the IOMMU group. `${g##*/}` is a parameter expansion that removes the directory part of `$g`, leaving just the group number.

`for d in $g/devices/*; do`: This starts a nested loop over each device in the current IOMMU group.

`echo -e "\t$(lspci -nns ${d##*/})"`: This prints the details of the device. `lspci -nns ${d##*/}` is used to get the device details from `lspci`, a utility for displaying information about PCI buses and the devices connected to them. $`{d##*/}` is a parameter expansion that removes the directory part of `$d`, leaving just the device number.