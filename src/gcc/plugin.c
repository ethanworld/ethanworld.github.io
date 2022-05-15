/* ------ plugin1.c ------ */

#include "gcc-plugin.h"
#include "plugin-version.h"

int plugin_is_GPL_compatible;

int plugin_init(struct plugin_name_args *plugin_info, struct plugin_gcc_version *version)
{
    if (!plugin_default_version_check(version, &gcc_version)) 
    {
	printf("incompatible gcc/plugin versions\n");
	return 1;
    }
    printf("Hello world!\n");
    return 0;
} 